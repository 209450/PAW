using GraphQL.Types;
using Mutations.Tables;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace back_end.Mutations.Types
{
    public class UserType : ObjectGraphType<User>
    {
        public UserType()
        {
            Name = "User";

            Field(h => h.Name, nullable: false).Description("User nickname");
            Field(h => h.Password, nullable: false).Description("User's password");
        }
    }
}
