using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Application.Sports;

namespace API.Controllers
{
    [AllowAnonymous]
    [Route("api/[controller]")]
    [ApiController]

    public class SportsController : ControllerBase
    {
        private readonly IMediator _mediator;
        public SportsController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpGet]
        public async Task<ActionResult<List<Sport>>> List()
        {
            return await _mediator.Send(new SportsList.Query());
        }
        
        [HttpGet("{id}")]

        public async Task<ActionResult<Sport>> Details(Guid id)
        {
            return await _mediator.Send(new SportsDetails.Query{Id = id});
        }


        [HttpPost]
        public async Task<ActionResult<Unit>> Create(SportsCreate.Command command)
        {
            return await _mediator.Send(command);
        }

        [HttpPut("{id}")]

         public async Task<ActionResult<Unit>> Edit(Guid id,SportsEdit.Command command)
        {
            command.Id = id;
            return await _mediator.Send(command);
        }

        [HttpDelete("{id}")]

            public async Task<ActionResult<Unit>> Delete(Guid id)
            {
                return await _mediator.Send(new SportsDelete.Command{Id = id});
            }
    }
}