using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace api.Models
{
    public class Monnaie
    {
        [Key]
        public int idMonnaie { get; set; }
        public decimal tauxChange { get; set; }
        public DateTime dateModificationMonnaie { get; set; }
    }
}