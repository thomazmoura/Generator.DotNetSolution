using System.Linq;

namespace CustomGeneratedProject.Dominio.Repositorios
{
    /// <summary> Interface padr�o para reposit�rios do sistema. Possui m�todos para CRUD com o tipo informado. </summary>
    /// <typeparam name="TEntidade"> O tipo espec�fico do reposit�rio. </typeparam>
    public interface IRepositorio<TEntidade> where TEntidade : class
    {
        /// <summary> Acrescenta um objeto ao reposit�rio. </summary>
        /// <param name="objeto"> O objeto a ser acrescentado ao reposit�rio. </param>
        void Acrescentar(TEntidade objeto);

        /// <summary> Edita um objeto existente no reposit�rio com base em sua ID. </summary>
        /// <param name="objeto"> O objeto que ser� usado como base para editar o objeto existente. </param>
        void Editar(TEntidade objeto);

        /// <summary> Exclui um objeto existente no repositorio </summary>
        /// <param name="objeto"> O objeto a ser exclu�do</param>
        void Excluir(TEntidade objeto);

        /// <summary> Lista todos os objetos do repositorio </summary>
        /// <returns> IEnumerable contendo todos os objetos do repositorio </returns>
        IQueryable<TEntidade> ListarTodos();

        /// <summary> Lista todos os objetos do repositorio sem manter informa��es de mudan�a. </summary>
        /// <returns> IEnumerable contendo todos os objetos do repositorio </returns>
        IQueryable<TEntidade> ListarTodosSomenteLeitura();

        /// <summary> Efetiva as mudan�as realizadas na fonte </summary>
        void SaveChanges();
    }
}
