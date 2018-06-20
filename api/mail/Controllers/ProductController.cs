using mail.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Caching.Memory;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;

namespace mail.Controllers
{
    public class ProductController : CachedController<List<Product>>
    {
        public ProductController(IConfiguration configuration, IMemoryCache cache) : base(configuration, cache)
        {
            var entities = this.GetCached();

            if (!entities.Any())
            {
                entities.Add(new Product { Id = 1, Name = "IPhone", Price = 5398, Description = "Apple Iphone X 64gb - Lacrado Garantia 1 Ano + Nota Fiscal ", PictureUrl = "https://http2.mlstatic.com/apple-iphone-x-64gb-lacrado-garantia-1-ano-nota-fiscal-D_NQ_NP_700474-MLB26700561612_012018-F.jpg" });
                entities.Add(new Product { Id = 2, Name = "Moto G", Price = 1199, Description = "Smartphone Motorola Moto G5s Plus Dtv Ouro Rosê 5,5 Androi", PictureUrl = "https://http2.mlstatic.com/smartphone-motorola-moto-g5s-plus-dtv-ouro-ros-55-androi-D_NQ_NP_619243-MLB26698221807_012018-F.jpg" });
                entities.Add(new Product { Id = 3, Name = "Notebook Acer", Price = 5747.99m, Description = "Notebook Predator G3-572-75L9 Intel Core i7 16GB (Geforce GTX 1060 com 6GB) 2TB Tela IPS Full HD 15,6 W10 - Acer", PictureUrl = "https://images-americanas.b2w.io/produtos/01/00/item/133284/4/133284449SZ.jpg" });
                entities.Add(new Product { Id = 4, Name = "IPad", Price = 2499.00m, Description = "iPad 32GB Wi-Fi Tela LED IPS 9.7 Câmera 8MP Ouro - Apple", PictureUrl = "https://images-americanas.b2w.io/produtos/01/00/item/133454/5/133454591_1GG.jpg" });
                entities.Add(new Product { Id = 5, Name = "TV 4k", Price = 2899.99m, Description = "Smart TV LED Ambilight 55 Philips 55PUG6212 / 78 Ultra HD 4k com Conversor Digital 4 HDMI 2 USB Wi - Fi 60Hz - Preto", PictureUrl = "https://images-americanas.b2w.io/produtos/01/00/item/133244/8/133244842SZ.jpg" });
                entities.Add(new Product { Id = 6, Name = "Drone", Price = 379, Description = "Drone Sky Laser Quadcopter Câmera 2.0 Homologado Lançamento", PictureUrl = "https://http2.mlstatic.com/drone-sky-laser-quadcopter-cmera-20-homologado-lancamento-D_NQ_NP_558615-MLB25272988034_012017-F.jpg" });
                entities.Add(new Product { Id = 7, Name = "Aspirador de Pó", Price = 170, Description = "Aspirador De Pó Vertical 2 Em 1 De Mão-mondial Ap-10 ", PictureUrl = "https://http2.mlstatic.com/aspirador-de-po-vertical-2-em-1-de-mo-mondial-ap-10-D_NQ_NP_731758-MLB27265972165_042018-F.jpg" });
                entities.Add(new Product { Id = 8, Name = "Ventilador", Price = 139, Description = "Ventilador Mesa Oscilante Turbo 50cm 127v - Ventisol ", PictureUrl = "https://http2.mlstatic.com/ventilador-mesa-oscilante-turbo-50cm-127v-ventisol-D_NQ_NP_820723-MLB26245832356_102017-F.jpg" });
                entities.Add(new Product { Id = 9, Name = "Playstation 4", Price = 2799.99m,  Description = "Console Playstation 4 Pro 1 TB + Controle Wireless DualShock 4", PictureUrl = "https://images-submarino.b2w.io/produtos/01/00/item/133092/7/133092720SZ.jpg" });
                entities.Add(new Product { Id = 10, Name = "Liquidificador", Price = 159.99m, Description = "Liquidificador Philips Walita Problend Preto com Cinza RI2135/9 - 2,4L 6 Lâminas e 5 Velocidades - 800W", PictureUrl = "https://images-submarino.b2w.io/produtos/01/00/item/130849/4/130849441SZ.jpg" });
                entities.Add(new Product { Id = 11, Name = "Beats", Price = 1299m, Description = "Headphone Beats Wireless Supra Auricular Solo 3", PictureUrl = "https://images-submarino.b2w.io/produtos/01/00/sku/36251/7/36251709_1SZ.jpg" });
                entities.Add(new Product { Id = 12, Name = "Violão", Price = 1377.99m, Description = "Violão Eletro Acústico Aço Yamaha F310 AII", PictureUrl = "https://images-submarino.b2w.io/produtos/01/00/sku/11311/2/11311284_1SZ.jpg" });

                this.SetChached(entities);
            }
        }
        
        [HttpGet]
        public IActionResult Get([FromQuery]string value = null)
        {
            var entities = this
                .GetCached()
                .Where(e => 
                    string.IsNullOrWhiteSpace(value) 
                    || e.Name.IndexOf(value, StringComparison.OrdinalIgnoreCase) >= 0
                    || e.Description.IndexOf(value, StringComparison.OrdinalIgnoreCase) >= 0
                )
                .ToList();

            return this.Ok(entities);
        }

        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var result = this.GetCached().FirstOrDefault(e => e.Id == id); 

            if (result != null)
                return this.Ok(result);

            return this.BadRequest();
        }
    }
}