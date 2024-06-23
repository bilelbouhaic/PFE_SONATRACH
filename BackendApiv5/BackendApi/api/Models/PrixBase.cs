using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace api.Models
{
    public class PrixBase
    {
        [Key]
        public int idPb { get; set; }
        public decimal prixBase { get; set; }
        public DateOnly dateModificationPb { get; set; }
         // Foreign key linking to Produit
        public int ProduitId { get; set; }  // This is the foreign key
        public Produit Produit { get; set; }  // Navigation property
    }
}