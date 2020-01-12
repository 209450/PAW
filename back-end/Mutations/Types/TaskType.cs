using GraphQL.Types;
using GraphQL.Authorization;
using Mutations.Tables;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Task = Mutations.Tables.Task;

namespace back_end.Mutations.Types
{
    public class TaskType : ObjectGraphType<Task>, IProvideMetadata
    {
        public TaskType()
        {
            this.AuthorizeWith("UserPolicy");

            Name = "Task";

            Field(h => h.Id, nullable: false).Description("Task id").AuthorizeWith("UserPolicy");
            Field(h => h.Name, nullable: false).Description("Task name").AuthorizeWith("UserPolicy");
            Field(h => h.Table_id, nullable: false).Description("Id of table that this task belongs to").AuthorizeWith("UserPolicy");
        }
    }
}