using System;
using System.Collections.Generic;
using System.Text;

namespace back_end.Helpers
{
    public class AppSettings
    {
        public string Secret { get; set; }
        public string Server { get; set; }
        public string Port { get; set; }
        public string Database { get; set; }
        public string Uid { get; set; }
        public string Pwd { get; set; }
    }
}
