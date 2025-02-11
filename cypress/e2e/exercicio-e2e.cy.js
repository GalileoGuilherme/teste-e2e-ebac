/// <reference types="cypress" />

context('Exercicio - Testes End-to-end - Fluxo de pedido', () => {
    /*  Como cliente 
        Quero acessar a Loja EBAC 
        Para fazer um pedido de 4 produtos 
        Fazendo a escolha dos produtos
        Adicionando ao carrinho
        Preenchendo todas opções no checkout
        E validando minha compra ao final */
  
    beforeEach(() => {
        cy.fixture('perfil').then((dados) => {
            cy.visit('/minha-conta')
            cy.login(dados.usuario, dados.senha)
        })
        cy.visit('/')
    });
  
    it('Deve fazer um pedido na loja Ebac Shop de ponta a ponta', () => {
        // Seleciona quatro produtos e os adiciona ao carrinho
        for (let i = 0; i < 4; i++) {
            cy.get('[data-test=produto]').eq(i).click()
            cy.get('[data-test=adicionar-carrinho]').click()
            cy.get('[data-test=voltar-loja]').click()
        }
  
        // Acessa o carrinho e confere os itens
        cy.get('[data-test=icone-carrinho]').click()
        cy.get('[data-test=itens-carrinho]').should('have.length', 4)
  
        // Prossegue para o checkout
        cy.get('[data-test=finalizar-compra]').click()
  
        // Preenche os dados do checkout
        cy.get('[data-test=nome]').type('Cliente Teste')
        cy.get('[data-test=email]').type('cliente@teste.com')
        cy.get('[data-test=endereco]').type('Rua Teste, 123')
        cy.get('[data-test=cidade]').type('São Paulo')
        cy.get('[data-test=cep]').type('01000-000')
        cy.get('[data-test=telefone]').type('11999999999')
  
        // Seleciona método de pagamento
        cy.get('[data-test=pagamento-cartao]').check()
        cy.get('[data-test=numero-cartao]').type('4111111111111111')
        cy.get('[data-test=validade-cartao]').type('12/25')
        cy.get('[data-test=cvv-cartao]').type('123')
  
        // Confirma a compra
        cy.get('[data-test=confirmar-compra]').click()
  
        // Valida a finalização da compra
        cy.get('[data-test=mensagem-sucesso]').should('contain', 'Compra realizada com sucesso')
    });
  });
  