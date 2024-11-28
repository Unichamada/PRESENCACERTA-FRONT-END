import { Badge } from "@/components/ui/badge";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { GetPresencaByTurmaDto } from "@/services/Evento/dto/get-presenca-by-turma.dto";
import { format } from "date-fns"; // Corrigido para format
import { useEffect, useState } from "react";

interface TablePresencaProps {
    data?: GetPresencaByTurmaDto[];
    tabelaID: string; // Adicionando tabelaID como prop para garantir que é passado corretamente
}

export function TablePresenca({
    data,
    tabelaID,
}: Readonly<TablePresencaProps>) {
    const [tableElement, setTableElement] = useState<HTMLTableElement | null>(
        null,
    );

    useEffect(() => {
        setTableElement(document.getElementById(tabelaID) as HTMLTableElement);
    }, [tabelaID]);

    return (
        <Table id={tabelaID}>
            <TableHeader>
                <TableRow>
                    <TableHead className="w-[100px]">Matricula</TableHead>
                    <TableHead>Nome</TableHead>
                    <TableHead>Data Presença</TableHead>
                    <TableHead>Hora Presença</TableHead>
                    <TableHead>Situação</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {data?.map((item) => (
                    <TableRow key={item.id}>
                        <TableCell className="font-medium">
                            {item.pessoa.codigo}
                        </TableCell>
                        <TableCell>{item.pessoa.nome}</TableCell>
                        <TableCell>
                            {item.dataPresenca
                                ? format(
                                      new Date(item.dataPresenca),
                                      "dd/MM/yyyy",
                                  )
                                : ""}
                        </TableCell>
                        <TableCell>
                            {item.horaPresenca
                                ? format(new Date(item.horaPresenca), "HH:mm")
                                : ""}
                        </TableCell>
                        <TableCell>
                            <Badge className="bg-green-600 text-center text-white">
                                Presente
                            </Badge>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}
