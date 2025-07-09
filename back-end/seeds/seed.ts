import mongoose, { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { config } from 'dotenv';
import { Author, AuthorSchema } from '../src/schema/author.schema';
import { Post, PostSchema } from 'src/schema/post.schema';
import { Comment, CommentSchema } from 'src/schema/comment.schema';

config();

export class Seed {
  private authorModel: Model<Author>;
  private postModel: Model<Post>;
  private commentModel: Model<Comment>;

  constructor() {
    this.authorModel = mongoose.model<Author>('Author', AuthorSchema);
    this.postModel = mongoose.model<Post>('Post', PostSchema);
    this.commentModel = mongoose.model<Comment>('Comment', CommentSchema);
  }

  async run() {
    try {
      await mongoose.connect(process.env.MONGO_DB_URI!);

      await this.seedAuthors();
      await this.seedPosts();
      await this.seedComments();

      await mongoose.disconnect();
    } catch (error) {
      console.error('Erro ao executar a migração:', error);
    }
  }

  async seedAuthors() {
    try {
      await this.authorModel.deleteMany({});

      const hashedPassword = await bcrypt.hash('123', 10);

      await this.authorModel.insertMany([
        {
          name: 'Alex Silva',
          email: 'alex@gmail.com',
          password: hashedPassword,
        },
        {
          name: 'Bruna Oliveira',
          email: 'bruna@gmail.com',
          password: hashedPassword,
        },
        {
          name: 'Carlos Souza',
          email: 'carlos@gmail.com',
          password: hashedPassword,
        },
        {
          name: 'Daniela Mendes',
          email: 'daniela@gmail.com',
          password: hashedPassword,
        },
        {
          name: 'Eduardo Lima',
          email: 'eduardo@gmail.com',
          password: hashedPassword,
        },
        {
          name: 'Fernanda Costa',
          email: 'fernanda@gmail.com',
          password: hashedPassword,
        },
        {
          name: 'Gabriel Santos',
          email: 'gabriel@gmail.com',
          password: hashedPassword,
        },
        {
          name: 'Helena Martins',
          email: 'helena@gmail.com',
          password: hashedPassword,
        },
        {
          name: 'Igor Ferreira',
          email: 'igor@gmail.com',
          password: hashedPassword,
        },
        {
          name: 'Juliana Rocha',
          email: 'juliana@gmail.com',
          password: hashedPassword,
        },
      ]);

      console.log('Autores inseridos com sucesso.');
    } catch (error) {
      console.error('Erro ao inserir autores:', error);
    }
  }

  async seedPosts() {
    try {
      await this.postModel.deleteMany({});

      const authorIds = await this.authorModel
        .find()
        .select('_id')
        .distinct('_id');

      const posts = [
        {
          title: 'Como Aprendi a Programar do Zero',
          content:
            'Sempre achei programação difícil até começar com HTML e CSS. Aos poucos, fui entendendo a lógica e, quando vi, já estava fazendo APIs em Node.js. Se você está começando, tenha paciência e pratique todos os dias!',
        },
        {
          title: '5 Dicas para Melhorar sua Produtividade',
          content:
            'Neste post, compartilho cinco estratégias simples que me ajudaram a ser mais produtivo: começar o dia cedo, usar listas de tarefas, evitar multitarefas, fazer pausas e revisar os objetivos semanalmente.',
        },
        {
          title: 'Por que Escolhi o Linux como Meu Sistema Principal',
          content:
            'Depois de anos usando Windows, migrei para o Linux e nunca mais voltei. A liberdade, a comunidade e o desempenho foram fatores que me conquistaram. Ubuntu foi minha porta de entrada, e hoje uso Arch Linux.',
        },
        {
          title: 'Aprenda Git em 15 Minutos',
          content:
            'Git pode parecer complicado, mas com alguns comandos básicos você já consegue versionar seus projetos. Neste guia rápido, ensino `git init`, `add`, `commit`, `push` e `pull` com exemplos práticos.',
        },
        {
          title: 'O Que é REST e por que Ele é Importante?',
          content:
            'REST é um estilo arquitetural que define um conjunto de restrições para criação de serviços web. Ele é simples, escalável e utiliza os métodos HTTP como GET, POST, PUT e DELETE. É a base de muitas APIs modernas.',
        },
        {
          title: 'Como Me Organizo para Estudar Programação',
          content:
            'Tenho uma rotina de estudos baseada em metas semanais e foco em projetos práticos. Uso ferramentas como Notion e Trello para manter tudo organizado. Também reservo tempo para revisar o que aprendi.',
        },
        {
          title: 'Refatorando um Código Horrível',
          content:
            'Peguei um código legado cheio de duplicações e funções gigantes. Com calma, fui extraindo métodos, nomeando variáveis melhor e aplicando o princípio da responsabilidade única. O resultado? Um código limpo e fácil de manter.',
        },
        {
          title: 'React ou Vue: Qual Escolher?',
          content:
            'Ambas as bibliotecas têm seus pontos fortes. React tem uma grande comunidade e muitos recursos, enquanto Vue é mais simples para começar. No final, depende do seu projeto e da equipe envolvida.',
        },
        {
          title: 'O Poder da Tipagem com TypeScript',
          content:
            'TypeScript trouxe segurança e produtividade ao meu código JavaScript. Os erros diminuíram, e o autocomplete melhorou. Se você ainda não experimentou, vale muito a pena investir um tempo aprendendo.',
        },
        {
          title: 'Meus Primeiros 6 Meses como Dev Júnior',
          content:
            'Entrei no mercado com medo, mas com muito desejo de aprender. No início, tudo parecia difícil, mas com apoio da equipe e muita leitura, consegui evoluir bastante. O segredo foi perguntar sem medo e nunca parar de estudar.',
        },
      ];

      const postPromises = posts.map((post, index) => {
        const author = authorIds[index % authorIds.length]; // distribui autores de forma cíclica, caso tenha menos de 10
        return this.postModel.insertOne({
          author,
          title: post.title,
          content: post.content,
        });
      });

      await Promise.all(postPromises);

      console.log('Posts inseridos com sucesso.');
    } catch (error) {
      console.error('Erro ao inserir posts:', error);
    }
  }

  async seedComments() {
    try {
      await this.commentModel.deleteMany({});

      const posts = await this.postModel.find().select('id');
      const authors = await this.authorModel.find().select('id');

      const commentsData = [
        [
          'Me identifiquei muito! Também comecei com HTML e hoje estou estudando back-end. Parabéns pela jornada!',
          'Juliana Mota',
        ],
        [
          'Ótimo incentivo para quem está começando. Às vezes a gente só precisa dar o primeiro passo mesmo.',
          'Lucas Andrade',
        ],

        [
          'Começar o dia cedo mudou minha vida também! A dica das pausas é subestimada por muita gente.',
          'Rafael Torres',
        ],
        [
          'Você usa algum app pra organizar as tarefas? Estou testando o Notion e tô gostando bastante.',
          'Beatriz Souza',
        ],

        [
          'Ubuntu foi minha porta de entrada também! Hoje uso Fedora, mas entendo bem seu ponto.',
          'Carlos Lima',
        ],
        [
          'Legal demais! Ainda tô com medo de migrar, mas vou testar no dual boot. Valeu pelo relato!',
          'Lívia Ferreira',
        ],

        [
          'Perfeito pra quem tá começando! Git pode parecer difícil no início, mas depois fica automático.',
          'Fernando Alves',
        ],
        [
          'Faltou mencionar o `git clone` e `branch`, mas mesmo assim ficou muito didático.',
          'Ana Clara Nunes',
        ],

        [
          'Gostei do resumo! Eu achava REST um bicho de sete cabeças até entender a ideia dos verbos HTTP.',
          'Marcos Paulo',
        ],
        [
          'Poderia fazer um post comparando REST com GraphQL? Seria interessante!',
          'Larissa Gomes',
        ],

        [
          'Notion é vida! Também uso ele pra acompanhar meus estudos e projetos.',
          'Eduardo Mendes',
        ],
        [
          'Curti a ideia das metas semanais, vou tentar implementar aqui também.',
          'Tatiane Rocha',
        ],

        [
          'Já passei por isso! Refatorar pode ser chato no início, mas a satisfação no final é imensa.',
          'Bruno Teixeira',
        ],
        [
          'Dá pra fazer uma série só com dicas de refatoração. Seria muito útil!',
          'Nathalia Correia',
        ],

        [
          'Estou usando Vue no meu projeto atual e achei muito fácil de aprender. Mas React ainda é o padrão no mercado.',
          'Gabriel Antunes',
        ],
        [
          'Já usei os dois e acho que Vue é ótimo pra projetos pequenos. React brilha em apps maiores.',
          'Samantha Reis',
        ],

        [
          'TypeScript salvou meu projeto de vários bugs bobos. Nunca mais desenvolvo em JS puro!',
          'João Pedro',
        ],
        [
          'Concordo demais! A curva de aprendizado vale muito a pena.',
          'Milena Martins',
        ],

        [
          'Texto inspirador! Estou entrando agora no mercado e suas palavras me motivaram muito.',
          'Paulo Henrique',
        ],
        [
          'É muito bom ver quem compartilha experiências reais. Obrigada por dividir sua trajetória!',
          'Camila Ramos',
        ],
      ];

      const commentPromises = commentsData.map(
        async ([content, name], index) => {
          const post = posts[index % posts.length];
          const availableAuthors = authors.filter((a) => a.id != post.author);
          const author = availableAuthors[index % availableAuthors.length];

          const comment = await this.commentModel.create({
            post: post._id,
            author: author._id,
            content,
          });

          await this.postModel.updateOne(
            { _id: post._id },
            { $push: { comments: comment._id } },
          );
        },
      );

      await Promise.all(commentPromises);

      console.log('Comentários inseridos com sucesso.');
    } catch (error) {
      console.error('Erro ao inserir comentários:', error);
    }
  }
}

new Seed().run();
