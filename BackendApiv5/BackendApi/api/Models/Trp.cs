using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace api.Models
{
    public class Trp
    {
        [Key]
        public int idTrp { get; set; }
        public decimal TauxTrp { get; set; }
        public decimal montantTrp { get; set; }
        public DateOnly dateTrp { get; set; }
                public int perimetreId { get; set; }  // This is the foreign key

        
    }
}