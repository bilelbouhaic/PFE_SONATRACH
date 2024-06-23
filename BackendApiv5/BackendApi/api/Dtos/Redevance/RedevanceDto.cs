using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Dtos.Redevance
{
    public class RedevanceDto
    {
        public string typeRdv { get; set; }= string.Empty;
        public DateOnly dateRdv { get; set; }
      
        
    }
}