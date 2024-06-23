using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace api.Models
{
    public class PrixMn
    {
        [Key]
         public int idPMn { get; set; }
        public decimal prixMn { get; set; }
        public DateOnly datemodificationPmn { get; set; }
         public int ProduitId { get; set; }  // This is the foreign key
        public Produit Produit { get; set; }  // Navigation property
    }
}