using CustomGeneratedProject.Dominio.Repositorios;
using System;
using System.Data.Entity;
using System.Linq;

namespace CustomGeneratedProject.Dados.Repositorios
{
    /// <summary> Reposit�rio padr�o para CRUD b�sico. </summary>
    /// <typeparam name="T"> Tipo (classe) de dados que esse reposit�rio manipular�. </typeparam>
    public class RepositorioEntityFramework<T>: IRepositorio<T> where T:class
    {
        /// <summary> Refer�ncia ao contexto de dados a qual esse reposit�rio pertence. </summary>
        protected DbContext _contexto { get; set; }

        /// <summary> Construtor do Reposit�rio Padr�o para detec��o autom�tica do IDbSet referente a T. </summary>
        /// <param name="contexto"> O contexto de dados ao qual esse reposit�rio pertence. </param>
        /// <exception cref="ArgumentException"> Quando o contexto passado n�o possui um IDbSet referente a T </exception>
        /// <remarks> � necess�rio que o contexto passado possua alguma propriedade que implemente o DbSet referente a T </remarks>
        public RepositorioEntityFramework(DbContext contexto)
        {
            try
            {
                contexto.Set<T>();
            }
            catch(Exception ex)
            {
                throw new ArgumentException(string.Format($"N�o foi poss�vel detectar o DbSet correspondente ao tipo {typeof(T).Name}. Verifique se o objeto de contexto de dados � v�lido. Detalhes do erro: {ex}"));
            }

            _contexto = contexto;
        }

        /// <summary> Obter um objeto espec�fico de acordo com sua ID. </summary>
        /// <param name="ID"> ID do objeto a ser retornado. </param>
        /// <returns> O objeto que possua a ID informada. </returns>
        public virtual T ObterPorId(int id)
        {
            return _contexto.Set<T>().Find(id);
        }

        /// <summary> Acrescenta um objeto ao reposit�rio. </summary>
        /// <param name="objeto"> O objeto a ser acrescentado ao reposit�rio. </param>
        public virtual void Acrescentar(T objeto)
        {
            _contexto.Set<T>().Add(objeto);
        }

        /// <summary> Edita um objeto existente no reposit�rio com base em sua ID. </summary>
        /// <param name="objeto"> O objeto que ser� usado como base para editar o objeto existente. </param>
        public virtual void Editar(T objeto)
        {
            _contexto.Set<T>().Attach(objeto);
            _contexto.Entry<T>(objeto).State = EntityState.Modified;
        }

        /// <summary> Exclui um objeto existente no repositorio </summary>
        /// <param name="objeto"> A ID do objeto a ser exclu�do</param>
        public virtual void Excluir(int id)
        {
            var objeto = _contexto.Set<T>().Find(id);
            _contexto.Set<T>().Remove(objeto);
        }

        /// <summary> Exclui um objeto existente no repositorio </summary>
        /// <param name="objeto"> O objeto a ser exclu�do</param>
        public virtual void Excluir(T objeto)
        {
            _contexto.Set<T>().Remove(objeto);
        }

        /// <summary> Lista todos os objetos do repositorio </summary>
        /// <returns> IQueryable contendo todos os objetos do repositorio </returns>
        public virtual IQueryable<T> ListarTodos()
        {
            return _contexto.Set<T>();
        }

        /// <summary> Lista todos os objetos do repositorio sem manter informa��es de mudan�a. </summary>
        /// <returns> IEnumerable contendo todos os objetos do repositorio </returns>
        public IQueryable<T> ListarTodosSomenteLeitura()
        {
            return _contexto.Set<T>().AsNoTracking();
        }

        /// <summary> Efetiva as mudan�as realizadas na fonte </summary>
        public virtual void SaveChanges()
        {
            _contexto.SaveChanges();
        }
    }
}
