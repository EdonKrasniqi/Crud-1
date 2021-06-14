using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Application.Libraries;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;

namespace API.Controllers
{
    [AllowAnonymous]
    [Route("api/[controller]")]
    [ApiController]

    public class LibraryController : ControllerBase
    {
        private readonly IMediator _mediator;
        public LibraryController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpGet]
        public async Task<ActionResult<List<Library>>> List()
        {
            return await _mediator.Send(new LibrariesList.Query());
        }
        
        [HttpGet("{id}")]

        public async Task<ActionResult<Library>> Details(Guid id)
        {
            return await _mediator.Send(new LibrariesDetails.Query{Id = id});
        }


        [HttpPost]
        public async Task<ActionResult<Unit>> Create(LibraryCreate.Command command)
        {
            return await _mediator.Send(command);
        }

        [HttpPut("{id}")]

         public async Task<ActionResult<Unit>> Edit(Guid id,LibrariesEdit.Command command)
        {
            command.Id = id;
            return await _mediator.Send(command);
        }

        [HttpDelete("{id}")]

            public async Task<ActionResult<Unit>> Delete(Guid id)
            {
                return await _mediator.Send(new LibrariesDelete.Command{Id = id});
            }
    }
}