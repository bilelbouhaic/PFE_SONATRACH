using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Dtos.Monnaie
{
    public class MonnaieDto
    {
        public decimal tauxChange { get; set; }
        public DateTime dateModificationMonnaie { get; set; }
    }
}