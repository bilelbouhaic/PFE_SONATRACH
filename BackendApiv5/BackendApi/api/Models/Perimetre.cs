using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace api.Models
{
    public class Perimetre
    {
        [Key]
        public int idPerimetre { get; set; }
        public string nomPerimetre { get; set; } = string.Empty;
        public bool associative { get; set; }
        public decimal qteGaz { get; set; }
        public int wilaya { get; set; }
        public int ZoneId { get; set; }  // This is the foreign keys
        public Zone zone { get; set; }  // Navigation property




     

    }
}