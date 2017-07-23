using System.Data.Entity;

namespace <%= solutionName %>.Dados
{
    public class <%= solutionName %>Context: DbContext
    {
        public <%= solutionName %>Context(): base("<%= solutionName %>Context") { }
    }
}
