import { InitialsPipe } from './initials-pipe';
describe('InitialsPipe', () => {
  let pipe: InitialsPipe;

  beforeEach(() => {
    pipe = new InitialsPipe();
  });

  it('deve retornar uma string vazia se o nome for vazio, nulo ou indefinido', () => {
    expect(pipe.transform('')).toBe('');
    expect(pipe.transform(null)).toBe('');
    expect(pipe.transform(undefined)).toBe('');
  });

  it('deve retornar as iniciais do nome se for fornecido', () => {
    expect(pipe.transform('joao douglas')).toBe('JD');
    expect(pipe.transform('jane smith')).toBe('JS');
  });

  it('deve retornar apenas a primeira letra se o nome tiver apenas uma palavra', () => {
    expect(pipe.transform('jane')).toBe('J');
  });

  it('deve ignorar espaços em branco', () => {
    expect(pipe.transform('joao   douglas')).toBe('J');
  });
});
