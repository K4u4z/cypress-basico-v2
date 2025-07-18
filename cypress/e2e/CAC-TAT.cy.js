describe('Minha primeira suite de testes automatizados', () => {

beforeEach(() => {
 cy.visit('./src/index.html')
})
//Modulo 1
it('Exercicio_1,Visitar a url abaixo', () =>{
  cy.title().should('be.equal','Central de Atendimento ao Cliente TAT')
})


//Modulo 2
it('Exercicio_2, escrever campos obrigatórios ', () =>{
  //Ações
  const longtext = Cypress._.repeat('teste',10)
  cy.get('#firstName').type('Kauã')
  cy.get('#lastName').type('Teste')
  cy.get('#email').type('kauateste@outlook.com')
  cy.get('input[type="number"]').type('kksaksk').should('not.have.value')
  cy.get('#open-text-area').type(longtext,{delay:0})
  cy.get('button[type="submit"]').click('')

  //Resultado esperado
  cy.get('.success').should('be.visible')


})

it('Exercicio_extra2_exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', () =>{
  //ações
    cy.get('#firstName').type('Kauã')
    cy.get('#lastName').type('Diodato')
    cy.get('#email').type('kauadiodato')
    cy.get('#open-text-area').type('kamehameha')
    cy.get('button[type="submit"]').click()

  //resultado esperado
  cy.get('.error').should('be.visible')
})

it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', () =>{
  cy.clock()
  //ações
  const longtext = Cypress._.repeat('kamehameha',10)
  cy.get('#firstName').type('Kauã')
  cy.get('#lastName').type('Diodato')
  cy.get('#email').type('kauadiodato@email.com')
  cy.get('#phone-checkbox').check()
  cy.get('#open-text-area').type(longtext, {delay:0})
  cy.get('button[type="submit"]').click()

  //resultado esperado
  cy.get('.error').should('be.visible')
  cy.tick(3000)
  cy.get('.error').should('not.be.visible')
})
it('exercicio_extra_5_preenche e limpa os campos nome, sobrenome, email e telefone', () =>{

  cy.get('#firstName')
  .type('kauã')
  .should('have.value', 'kauã')
  .clear()
  .should('not.have.value')
  
  cy.get('#lastName')
  .type('diodato')
  .should('have.value','diodato')
  .clear()
  .should('not.have.value')

  cy.get('#email')
  .type('kauateste@gmail.com')
  .should('have.value', 'kauateste@gmail.com')
  .clear()
  .should('not.have.value')

  cy.get('#phone')
  .type('984652311')
  .should('have.value','984652311')
  .clear()
  .should('not.have.value')

})

it('exercicio_extra_6_exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', () =>{
  cy.get('button[type="submit"').click()
  cy.get('.error').should('be.visible')
})

it('exercicio_extra_7_executa comandos com gui commands',() =>{


  cy.fillMandatoryFieldsAndSubmit()

  cy.get('.success').should('be.visible')
})

it('exercicio_extra8_utilizar constains ao inves do cy.get', () =>{
 //ações
 cy.clock() 
 cy.contains('Nome').type('Kauã')
    cy.contains('Sobrenome').type('Diodato')
    cy.contains('E-mail').type('kauateste@outlook.com')
    cy.contains('Como podemos te ajudar? Algum elogio ou feedback para nós?').type('kamehameha')
    cy.contains('button', 'Enviar').click()

  
  cy.get('.success').should('be.visible')
  
  cy.tick(3000)
  cy.get('.success').should('not.be.visible')
})

// Modulo 3 

it('seleciona um produto (YouTube) por seu texto',() =>{
cy.get('select')
.select('YouTube')
.should('have.value', 'youtube')
})

it('seleciona um produto (Mentoria) por seu valor (value)',()=>{
  cy.get('select')
  .select('mentoria')
  .should('have.value','mentoria')
})

it('seleciona um produto (Blog) por seu índice',()=>{
  cy.get('select')
  .select(1)
  .should('have.value','blog')
})

//Modulo 4 

it('marca o tipo de atendimento "Feedback"', () =>{
  cy.get('input[type="radio"][value="feedback"]').check()
  .should('have.value','feedback')
 
})

it('marca cada tipo de atendimento', () =>{
  cy.get('input[type="radio"')
    .check()
    .should('be.checked')
  })

it('marca ambos checkboxes, depois desmarca o último',()=>{
  cy.get('input[type="checkbox"]')
  .check()
  .last()
  .uncheck()
  .should('not.be.checked')
})

//Modulo 7

it('seleciona um arquivo da pasta fixtures', () => {
  cy.get('input[type="file"]').
  selectFile('cypress/fixtures/example.json')
  .then(input =>{
    expect(input[0].files[0].name).to.equal('example.json')
  })
})

it('seleciona um arquivo simulando um drag-and-drop',() =>{
  cy.get('input[type="file"]').
  selectFile('cypress/fixtures/example.json',{action:'drag-drop'})
  .then(input =>{
    expect(input[0].files[0].name).to.equal('example.json')
  })
  
})

it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias',()=>{
  cy.fixture('example.json',{encoding:null}).as('exampleFile')
  cy.get('input[type="file"]')
  .selectFile('@exampleFile')
  .then(input =>{
    expect(input[0].files[0].name).be.equal('example.json')
  })
})
//Modulo 8
it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', ()=>{
  cy.contains('a','Política de Privacidade').should('have.attr','target','_blank')
  .and('have.attr','href','privacy.html')
})

it('acessa a página da política de privacidade removendo o target e então clicando no link', ()=>{
  cy.contains('a','Política de Privacidade').invoke('removeAttr', 'target').click()

  cy.contains('h1','CAC TAT - Política de Privacidade').should('be.visible')
})

Cypress._.times(5, () =>{
it('testa a página da política de privacidade de forma independente', ()=>{
  cy.contains('a','Política de Privacidade').invoke('removeAttr', 'target').click()

  cy.title().should('be.equal','Central de Atendimento ao Cliente TAT - Política de Privacidade')

  cy.contains('h1','CAC TAT - Política de Privacidade').should('be.visible')


})
})

it('exibe e oculta as mensagens de sucesso e erro usando .invoke()', () => {
  cy.get('.success')
    .should('not.be.visible')
    .invoke('show')
    .should('be.visible')
    .and('contain', 'Mensagem enviada com sucesso.')
    .invoke('hide')
    .should('not.be.visible')
  cy.get('.error')
    .should('not.be.visible')
    .invoke('show')
    .should('be.visible')
    .and('contain', 'Valide os campos obrigatórios!')
    .invoke('hide')
    .should('not.be.visible')
})

it('preenche o campo da área de texto usando o comando invoke', ()=>{
  cy.get('#open-text-area')
  .invoke('val','kamehameha')
  .should('have.value','kamehameha')
})

it('faça uma requisição HTTP',()=>{
  cy.request({
    method:'GET',
    url: 'https://cac-tat-v3.s3.eu-central-1.amazonaws.com/index.html'
  })
  .then((response)=>{
    cy.expect(response.status).to.equal(200)
    cy.expect(response.statusText).to.equal('OK')
    cy.request('https://cac-tat-v3.s3.eu-central-1.amazonaws.com/index.html').its('body').should('include','CAC TAT')
  })
  
})

it('encontre e esconda o gato escondido na aplicação e altere o titulo da aplicação', ()=>{
  cy.get('#cat')
  .should('not.be.visible')
  .invoke('show')
  .should('be.visible')
  .invoke('hide')
  .should('not.be.visible')
  cy.get('#title').invoke('text', 'CAT TAT')
})

})