using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Domain;
using Application.Contacts;

namespace API.Controllers
{
    [AllowAnonymous]
    [Route("api/[controller]")]
    [ApiController]

    public class ContactController : ControllerBase
    {
        private readonly IMediator _mediator;
        public ContactController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpGet]
        public async Task<ActionResult<List<Contact>>> List()
        {
            return await _mediator.Send(new CList.Query());
        }
        
        [HttpGet("{id}")]

        public async Task<ActionResult<Contact>> Details(Guid id)
        {
            return await _mediator.Send(new CDetails.Query{Id= id});
        }


        [HttpPost]
        public async Task<ActionResult<Unit>> Create(CCreate.Command command)
        {
            return await _mediator.Send(command);
        }

    }
}