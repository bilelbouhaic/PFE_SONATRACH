using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace api.Models
{
    public class Zone
    {
        [Key]
         public int idZone { get; set; }
        public string localisation { get; set; } =string.Empty;
        
    }
}