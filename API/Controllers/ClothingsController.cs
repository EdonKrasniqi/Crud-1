using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Application.Clothings;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;

namespace API.Controllers
{
    [AllowAnonymous]
    [Route("api/[controller]")]
    [ApiController]

    public class ClothingsController : ControllerBase
    {
        private readonly IMediator _mediator;
        public ClothingsController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpGet]
        public async Task<ActionResult<List<Clothing>>> List()
        {
            return await _mediator.Send(new ClothingsList.Query());
        }
        
        [HttpGet("{id}")]

        public async Task<ActionResult<Clothing>> Details(Guid id)
        {
            return await _mediator.Send(new ClothingsDetails.Query{Id = id});
        }


        [HttpPost]
        public async Task<ActionResult<Unit>> Create(ClothingCreate.Command command)
        {
            return await _mediator.Send(command);
        }

        [HttpPut("{id}")]

         public async Task<ActionResult<Unit>> Edit(Guid id,ClothingsEdit.Command command)
        {
            command.Id = id;
            return await _mediator.Send(command);
        }

        [HttpDelete("{id}")]

            public async Task<ActionResult<Unit>> Delete(Guid id)
            {
                return await _mediator.Send(new ClothingsDelete.Command{Id = id});
            }
    }
}