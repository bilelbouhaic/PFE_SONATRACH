using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace api.Models
{
    public class TarifTransport
    {
        [Key]
        public int idTt { get; set; }
        
        public decimal tarifTransport { get; set; }
        public DateOnly dateModificationTt { get; set; }
         public int ProduitId { get; set; }  // This is the foreign key
        public Produit Produit { get; set; }  // Navigation property
    }
}