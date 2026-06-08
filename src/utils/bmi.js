export function calcularIMC(peso, altura) {
  if (!peso || !altura || altura <= 0) return null
  const alturaM = altura / 100
  return peso / (alturaM * alturaM)
}

export function classificarIMC(imc) {
  if (imc < 18.5) return { label: 'Abaixo do peso', color: 'text-blue-500' }
  if (imc < 25) return { label: 'Peso normal', color: 'text-green-500' }
  if (imc < 30) return { label: 'Sobrepeso', color: 'text-yellow-500' }
  if (imc < 35) return { label: 'Obesidade grau I', color: 'text-orange-500' }
  if (imc < 40) return { label: 'Obesidade grau II', color: 'text-red-500' }
  return { label: 'Obesidade grau III', color: 'text-red-700' }
}
