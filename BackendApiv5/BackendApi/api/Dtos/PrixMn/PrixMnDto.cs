using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Dtos.PrixMn
{
    public class PrixMnDto
    {
         public decimal prixMn { get; set; }
        public DateTime datemodificationPmn { get; set; }
         public int ProduitId { get; set; } 
    }
}