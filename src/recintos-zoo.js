class RecintosZoo {
  constructor() {
      this.animais = [
          { especie: 'MACACO', tamanho: 2, bioma: 'TROPICAL' },
          { especie: 'CROCODILO', tamanho: 3, bioma: 'PANTANOSO' }
      ];
      this.recintoZoo = [
          { numero: 1, tamanho: 10, bioma: 'TROPICAL', ocupacao: 5 },
          { numero: 2, tamanho: 5, bioma: 'TROPICAL', ocupacao: 2 },
          { numero: 3, tamanho: 7, bioma: 'TROPICAL', ocupacao: 5 },
          { numero: 4, tamanho: 8, bioma: 'PANTANOSO', ocupacao: 3 }
      ];
  }

  obterTamanhoOcupado(recinto) {
      return recinto.ocupacao;
  }

  verificaRegras(recinto, animal, quantidade) {
      // Verifica se o bioma é compatível
      if (recinto.bioma !== animal.bioma) {
          return false;
      }

      // Verifica se o espaço disponível é suficiente
      const espacoLivre = recinto.tamanho - this.obterTamanhoOcupado(recinto);
      const espacoNecessario = quantidade * animal.tamanho;
      return espacoLivre >= espacoNecessario;
  }

  analisaRecintos(especie, quantidade) {
      if (quantidade <= 0) {
          return { erro: "Quantidade inválida" };
      }

      let animal = this.animais.find((animal) => animal.especie.toLowerCase() === especie.toLowerCase());

      if (!animal) {
          return { erro: "Animal inválido" };
      }

      // Filtra os recintos que atendem ao bioma e às regras de espaço
      let recintosViaveis = this.recintoZoo
          .filter((recinto) => this.verificaRegras(recinto, animal, quantidade))
          .map((recinto) => {
              const espacoLivre = recinto.tamanho - this.obterTamanhoOcupado(recinto) - quantidade * animal.tamanho;
              return `Recinto ${recinto.numero} (espaço livre: ${espacoLivre} total: ${recinto.tamanho})`;
          });

      if (recintosViaveis.length === 0) {
          return { erro: "Não há recinto viável" };
      }

      return {
          erro: null,
          recintosViaveis,
      };
  }
}

export { RecintosZoo as RecintosZoo };
