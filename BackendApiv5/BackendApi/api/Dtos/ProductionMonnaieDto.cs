using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Dtos
{
    public class ProductionMonnaieDto
    {
        public decimal TauxChange { get; set; }
        public decimal QuantiteProduite { get; set; }
        public decimal PrixBPetrole { get; set; }
        public decimal PrixBGaz { get; set; }
        public decimal PrixBCondensat { get; set; }
        public decimal PrixBGpl { get; set; }
    }
}