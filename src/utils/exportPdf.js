import { jsPDF } from 'jspdf'

const OBJETIVOS = {
  emagrecimento: 'Emagrecimento',
  massa: 'Ganho de Massa',
  recomposicao: 'Recomposição Corporal',
  manutencao: 'Manutenção de Peso',
}

export function exportarPDF({ texto, dados }) {
  const doc = new jsPDF({ unit: 'mm', format: 'a4' })
  const pageWidth = doc.internal.pageSize.getWidth()
  const pageHeight = doc.internal.pageSize.getHeight()
  const marginX = 20
  const maxWidth = pageWidth - marginX * 2
  let y = 0

  const checkPage = (needed = 8) => {
    if (y + needed > pageHeight - 16) {
      doc.addPage()
      y = 20
    }
  }

  // Faixa de cabeçalho
  doc.setFillColor(18, 18, 18)
  doc.rect(0, 0, pageWidth, 40, 'F')

  doc.setFont('helvetica', 'bold')
  doc.setFontSize(18)
  doc.setTextColor(255, 255, 255)
  doc.text('Plano Alimentar Personalizado', marginX, 18)

  doc.setFont('helvetica', 'normal')
  doc.setFontSize(9)
  doc.setTextColor(160, 160, 160)
  const objetivo = OBJETIVOS[dados.objetivo] || dados.objetivo
  doc.text(
    `${dados.peso}kg  ·  ${dados.altura}cm  ·  ${dados.idade} anos  ·  ${dados.sexo === 'masculino' ? 'Masculino' : 'Feminino'}  ·  ${objetivo}`,
    marginX,
    28
  )

  y = 52

  // Corpo
  const linhas = texto.split('\n')

  for (const linha of linhas) {
    const trimmed = linha.trim()

    if (!trimmed) {
      y += 3
      continue
    }

    if (trimmed.startsWith('## ')) {
      checkPage(14)
      y += 4

      const titulo = trimmed.replace(/^##\s*/, '').replace(/[\u{1F300}-\u{1FFFF}]/gu, '').trim()

      // Linha de destaque lateral
      doc.setFillColor(18, 18, 18)
      doc.rect(marginX, y - 4, 2, 9, 'F')

      doc.setFont('helvetica', 'bold')
      doc.setFontSize(12)
      doc.setTextColor(18, 18, 18)
      doc.text(titulo, marginX + 6, y)
      y += 8
      continue
    }

    if (trimmed === '---') {
      checkPage(6)
      doc.setDrawColor(220, 220, 220)
      doc.setLineWidth(0.3)
      doc.line(marginX, y, pageWidth - marginX, y)
      y += 6
      continue
    }

    if (trimmed.startsWith('**') && trimmed.endsWith('**')) {
      checkPage(7)
      doc.setFont('helvetica', 'bold')
      doc.setFontSize(10)
      doc.setTextColor(30, 30, 30)
      const label = trimmed.replace(/\*\*/g, '')
      doc.text(label, marginX, y)
      y += 6
      continue
    }

    if (trimmed.startsWith('**') && trimmed.includes(':**')) {
      checkPage(6)
      const match = trimmed.match(/^\*\*(.+?)\*\*:(.*)$/)
      if (match) {
        const label = match[1]
        const value = match[2].trim()
        doc.setFont('helvetica', 'bold')
        doc.setFontSize(10)
        doc.setTextColor(30, 30, 30)
        const labelWidth = doc.getTextWidth(`${label}: `)
        doc.text(`${label}: `, marginX, y)
        doc.setFont('helvetica', 'normal')
        doc.setTextColor(90, 90, 90)
        const valueLines = doc.splitTextToSize(value, maxWidth - labelWidth)
        doc.text(valueLines[0] || '', marginX + labelWidth, y)
        y += 5.5
        for (let i = 1; i < valueLines.length; i++) {
          checkPage(5)
          doc.text(valueLines[i], marginX, y)
          y += 5.5
        }
        continue
      }
    }

    if (trimmed.startsWith('- ')) {
      checkPage(6)
      const content = trimmed.slice(2)
      doc.setFont('helvetica', 'normal')
      doc.setFontSize(10)
      doc.setTextColor(90, 90, 90)
      doc.setFillColor(90, 90, 90)
      doc.circle(marginX + 1.5, y - 1.5, 0.8, 'F')
      const lines = doc.splitTextToSize(content, maxWidth - 8)
      lines.forEach((l, idx) => {
        checkPage(5)
        doc.text(l, marginX + 6, idx === 0 ? y : y)
        if (idx < lines.length - 1) y += 5
      })
      y += 5.5
      continue
    }

    checkPage(6)
    doc.setFont('helvetica', 'normal')
    doc.setFontSize(10)
    doc.setTextColor(90, 90, 90)
    const lines = doc.splitTextToSize(trimmed, maxWidth)
    lines.forEach((l) => {
      checkPage(5)
      doc.text(l, marginX, y)
      y += 5
    })
    y += 1
  }

  // Rodapé em todas as páginas
  const totalPages = doc.internal.getNumberOfPages()
  for (let p = 1; p <= totalPages; p++) {
    doc.setPage(p)
    doc.setFont('helvetica', 'normal')
    doc.setFontSize(8)
    doc.setTextColor(180, 180, 180)
    doc.text('Gerado por Plano Alimentar IA', marginX, pageHeight - 8)
    doc.text(`${p} / ${totalPages}`, pageWidth - marginX, pageHeight - 8, { align: 'right' })
  }

  doc.save('plano-alimentar.pdf')
}
