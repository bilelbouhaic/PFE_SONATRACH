using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace api.Models
{
    public class Production
    {
        [Key]
        public int idRdv { get; set; }
       

        public decimal ProductionValorise { get; set; }
          public decimal qteProduite { get; set; }

        public decimal CoutTransport { get; set; }
    
        public string typeRdv { get; set; }= string.Empty;
        public DateOnly dateRdv { get; set; }
        

      public int ProduitId { get; set; }  // This is the foreign keys
        public Produit produit { get; set; }  // Navigation property

        public int perimetreId { get; set; }  // This is the foreign key
        public Perimetre perimetre { get; set; }  // Navigation property
    }
}