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
        return {
          author: authorIds[index],
          title: post.title,
          content: post.content,
        }
      });

      await this.postModel.insertMany(postPromises);

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
        {
          post: posts[0]._id,
          author: authors[1]._id,
          content: 'Me identifiquei muito! Também comecei com HTML e hoje estou estudando back-end. Parabéns pela jornada!'
        },
        {
          post: posts[0]._id,
          author: authors[2]._id,
          content: 'Ótimo incentivo para quem está começando. Às vezes a gente só precisa dar o primeiro passo mesmo.'
        },
        {
          post: posts[1]._id,
          author: authors[2]._id,
          content: 'Começar o dia cedo mudou minha vida também! A dica das pausas é subestimada por muita gente.'
        },
        {
          post: posts[1]._id,
          author: authors[3]._id,
          content: 'Você usa algum app pra organizar as tarefas? Estou testando o Notion e tô gostando bastante.'
        },
        {
          post: posts[2]._id,
          author: authors[3]._id,
          content: 'Ubuntu foi minha porta de entrada também! Hoje uso Fedora, mas entendo bem seu ponto.'
        },
        {
          post: posts[2]._id,
          author: authors[4]._id,
          content: 'Legal demais! Ainda tô com medo de migrar, mas vou testar no dual boot. Valeu pelo relato!'
        },
        {
          post: posts[3]._id,
          author: authors[4]._id,
          content: 'Perfeito pra quem tá começando! Git pode parecer difícil no início, mas depois fica automático.'
        },
        {
          post: posts[3]._id,
          author: authors[5]._id,
          content: 'Faltou mencionar o `git clone` e `branch`, mas mesmo assim ficou muito didático.'
        },
        {
          post: posts[4]._id,
          author: authors[5]._id,
          content: 'Gostei do resumo! Eu achava REST um bicho de sete cabeças até entender a ideia dos verbos HTTP.'
        },
        {
          post: posts[4]._id,
          author: authors[6]._id,
          content: 'Poderia fazer um post comparando REST com GraphQL? Seria interessante!'
        },
        {
          post: posts[5]._id,
          author: authors[6]._id,
          content: 'Notion é vida! Também uso ele pra acompanhar meus estudos e projetos.'
        },
        {
          post: posts[5]._id,
          author: authors[7]._id,
          content: 'Curti a ideia das metas semanais, vou tentar implementar aqui também.'
        },
        {
          post: posts[6]._id,
          author: authors[7]._id,
          content: 'Já passei por isso! Refatorar pode ser chato no início, mas a satisfação no final é imensa.'
        },
        {
          post: posts[6]._id,
          author: authors[8]._id,
          content: 'Dá pra fazer uma série só com dicas de refatoração. Seria muito útil!'
        },
        {
          post: posts[7]._id,
          author: authors[8]._id,
          content: 'Estou usando Vue no meu projeto atual e achei muito fácil de aprender. Mas React ainda é o padrão no mercado.'
        },
        {
          post: posts[7]._id,
          author: authors[9]._id,
          content: 'Já usei os dois e acho que Vue é ótimo pra projetos pequenos. React brilha em apps maiores.'
        },
        {
          post: posts[8]._id,
          author: authors[9]._id,
          content: 'TypeScript salvou meu projeto de vários bugs bobos. Nunca mais desenvolvo em JS puro!'
        },
        {
          post: posts[8]._id,
          author: authors[0]._id,
          content: 'Concordo demais! A curva de aprendizado vale muito a pena.'
        },
        {
          post: posts[9]._id,
          author: authors[0]._id,
          content: 'Texto inspirador! Estou entrando agora no mercado e suas palavras me motivaram muito.'
        },
        {
          post: posts[9]._id,
          author: authors[1]._id,
          content: 'É muito bom ver quem compartilha experiências reais. Obrigada por dividir sua trajetória!'
        },
      ];

      const commentPromises = commentsData.map(
        async (comment, index) => {

          const newComment = await this.commentModel.create(comment);

          await this.postModel.updateOne(
            { _id: comment.post },
            { $push: { comments: newComment._id } },
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
