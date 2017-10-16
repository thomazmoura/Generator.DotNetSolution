using System.Data.Entity;

namespace SolutionNamespace.Dados
{
    public class SolutionNameContext: DbContext
    {
        public SolutionNameContext(): base("SolutionNameContext") { }
    }
}
