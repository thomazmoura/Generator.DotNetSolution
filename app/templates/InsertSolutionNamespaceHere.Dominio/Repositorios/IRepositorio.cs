using System.Linq;

namespace CustomGeneratedProject.Dominio.Repositorios
{
    /// <summary> Interface padrão para repositórios do sistema. Possui métodos para CRUD com o tipo informado. </summary>
    /// <typeparam name="TEntidade"> O tipo específico do repositório. </typeparam>
    public interface IRepositorio<TEntidade> where TEntidade : class
    {
        /// <summary> Acrescenta um objeto ao repositório. </summary>
        /// <param name="objeto"> O objeto a ser acrescentado ao repositório. </param>
        void Acrescentar(TEntidade objeto);

        /// <summary> Edita um objeto existente no repositório com base em sua ID. </summary>
        /// <param name="objeto"> O objeto que será usado como base para editar o objeto existente. </param>
        void Editar(TEntidade objeto);

        /// <summary> Exclui um objeto existente no repositorio </summary>
        /// <param name="objeto"> O objeto a ser excluído</param>
        void Excluir(TEntidade objeto);

        /// <summary> Lista todos os objetos do repositorio </summary>
        /// <returns> IEnumerable contendo todos os objetos do repositorio </returns>
        IQueryable<TEntidade> ListarTodos();

        /// <summary> Lista todos os objetos do repositorio sem manter informações de mudança. </summary>
        /// <returns> IEnumerable contendo todos os objetos do repositorio </returns>
        IQueryable<TEntidade> ListarTodosSomenteLeitura();

        /// <summary> Efetiva as mudanças realizadas na fonte </summary>
        void SaveChanges();
    }
}
