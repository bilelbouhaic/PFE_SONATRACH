using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace api.Models
{
    public class Investissement
    {   [Key]
         public int idInvest{ get; set; }
        public decimal montantInvest { get; set; }
        public string typeInvest { get; set; }= string.Empty;
        public DateOnly dateInvet { get; set; }


      

    }
}