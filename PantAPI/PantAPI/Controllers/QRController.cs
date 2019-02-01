﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using PantAPI.Models;
using PantAPI.Repositories;

namespace PantAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class QRController : ControllerBase
    {
        [HttpGet]
        [Route("tull")]
        public async Task<Bag> Tull([FromServices] BagRepository bagRepository)
        {
            var bagId = "d9c47d23-f35d-41e4-9652-99bd8609534d";
            var userId = "94d0266d-b4c0-47f2-88fd-d25ec8829915";
            
            return await bagRepository.GetAsync(userId, bagId);
        }

        // GET api/values
        [HttpPost]
        [Route("Add")]
        [ProducesResponseType(typeof(string), 200)]
        public ActionResult Add()
        {
            var bagid = Guid.NewGuid().ToString();
            var url = "https://bouvet-panther.azurewebsites.net/activate/" +bagid ;

            var bag = new Bag
            {
                CreatedDate = DateTime.UtcNow,
                Status = BagStatus.Created
            };

            return Ok(url);
        }

        [HttpPost]
        [Route("Activate")]
        [ProducesResponseType(typeof(ActivateResultModel), 200)]
        public ActionResult Activate([FromBody] ActivateModel activateModel)
        {

            
            //oppdater qr-code-"record" med bruker som har registrert posen
            //sett status som "active?"
            return Ok(new ActivateResultModel
            {
                Status = ActivativateStatus.OK
            });
            //hvis koden ikke finnes i databasen, returneres false;

        }

        [HttpGet]
        [Route("Generate")]
        [ProducesResponseType(typeof(string), 200)]
        public ActionResult Generate(string qrCode)
        {
            var generator = new QRCoder.QRCodeGenerator();
            var qRCodeData = generator.CreateQrCode(qrCode, QRCoder.QRCodeGenerator.ECCLevel.Q);
            var qRCoder = new QRCoder.SvgQRCode(qRCodeData);
            var resultat = qRCoder.GetGraphic(5);
            return Ok(resultat);
        }


    }
}
