using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Application.Libraries;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Application.Households;

namespace API.Controllers
{
    [AllowAnonymous]
    [Route("api/[controller]")]
    [ApiController]

    public class HouseholdController : ControllerBase
    {
        private readonly IMediator _mediator;
        public HouseholdController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpGet]
        public async Task<ActionResult<List<Household>>> List()
        {
            return await _mediator.Send(new HouseholdsList.Query());
        }
        
        [HttpGet("{id}")]

        public async Task<ActionResult<Household>> Details(Guid id)
        {
            return await _mediator.Send(new HouseholdsDetails.Query{Id = id});
        }


        [HttpPost]
        public async Task<ActionResult<Unit>> Create(HouseholdsCreate.Command command)
        {
            return await _mediator.Send(command);
        }

        [HttpPut("{id}")]

         public async Task<ActionResult<Unit>> Edit(Guid id,HouseholdsEdit.Command command)
        {
            command.Id = id;
            return await _mediator.Send(command);
        }

        [HttpDelete("{id}")]

            public async Task<ActionResult<Unit>> Delete(Guid id)
            {
                return await _mediator.Send(new HouseholdsDelete.Command{Id = id});
            }
    }
}