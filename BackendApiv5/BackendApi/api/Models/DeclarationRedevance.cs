using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace api.Models
{
    public class DeclarationRedevance
    {
    
       [Key]
        public int idDeclaration { get; set; }
        public decimal TauxRdv { get; set; }
        public decimal BaseRdv { get; set; }
        public decimal montantRdv { get; set; }
        
        
        public string typeRdv { get; set; }= string.Empty;
        public DateOnly dateRdv { get; set; }
        

        public int perimetreId { get; set; }  // This is the foreign key
        public Perimetre perimetre { get; set; }  // Navigation property
    }
}