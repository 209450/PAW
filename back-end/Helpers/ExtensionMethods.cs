﻿using Mutations.Tables;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace back_end.Helpers
{
    public static class ExtensionMethods
    {
        public static IEnumerable<User> WithoutPasswords(this IEnumerable<User> users)
        {
            return users.Select(x => x.WithoutPassword()).Select(x => x.WithoutId());
        }

        public static User WithoutPassword(this User user)
        {
            user.Password = null;
            return user;
        }

        public static User WithoutId(this User user)
        {
            user.Id = null;
            return user;
        }
    }
}
