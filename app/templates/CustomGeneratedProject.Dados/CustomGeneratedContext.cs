using System.Data.Entity;

namespace <%= solutionName %>.Dados
{
    public class CustomGeneratedContext: DbContext
    {
        public CustomGeneratedContext(): base("CustomGeneratedContext") { }
    }
}
