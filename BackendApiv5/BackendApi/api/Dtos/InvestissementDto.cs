using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Dtos
{
    public class InvestissementDto
    {
        public decimal montantInvest { get; set; }
        public string typeInvest { get; set; }= string.Empty;
        public DateOnly dateInvet { get; set; }
    }
}