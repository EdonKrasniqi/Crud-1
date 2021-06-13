using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Application.Healths;

namespace API.Controllers
{
    [AllowAnonymous]
    [Route("api/[controller]")]
    [ApiController]

    public class HealthsController : ControllerBase
    {
        private readonly IMediator _mediator;
        public HealthsController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpGet]
        public async Task<ActionResult<List<Health>>> List()
        {
            return await _mediator.Send(new HealthsList.Query());
        }
        
        [HttpGet("{id}")]

        public async Task<ActionResult<Health>> Details(Guid id)
        {
            return await _mediator.Send(new HealthsDetails.Query{Id = id});
        }


        [HttpPost]
        public async Task<ActionResult<Unit>> Create(HealthCreate.Command command)
        {
            return await _mediator.Send(command);
        }

        [HttpPut("{id}")]

         public async Task<ActionResult<Unit>> Edit(Guid id,HealthsEdit.Command command)
        {
            command.Id = id;
            return await _mediator.Send(command);
        }

        [HttpDelete("{id}")]

            public async Task<ActionResult<Unit>> Delete(Guid id)
            {
                return await _mediator.Send(new HealthsDelete.Command{Id = id});
            }
    }
}