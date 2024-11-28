"use client";

import * as XLSX from "xlsx";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

interface BotaoExportaTabelaProps {
    tabelaID: string;
}

export function BotaoExportaTabela({ tabelaID }: BotaoExportaTabelaProps) {
    const exportarPlanilha = () => {
        const tabela = document.getElementById(tabelaID);
        if (!tabela) {
            console.error("Tabela não encontrada");
            return;
        }

        // Converte a tabela HTML para um sheet
        const worksheet = XLSX.utils.table_to_sheet(tabela);
        const workbook = XLSX.utils.book_new();

        XLSX.utils.book_append_sheet(workbook, worksheet, "Planilha1");

        // Gera o arquivo Excel e faz o download
        XLSX.writeFile(workbook, "tabela.xlsx");
    };

    return (
        <Button
            onClick={exportarPlanilha}
            className="bg-green-600 gap-2 rounded-lg text-blue-50 hover:bg-green-700"
        >
            <Download size={20} />
            Exportar Chamada
        </Button>
    );
}
