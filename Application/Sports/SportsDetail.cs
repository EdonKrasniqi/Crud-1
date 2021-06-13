using System;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Presistence;

namespace Application.Sports
{
    public class SportsDetails
    {
        public class Query : IRequest<Sport>
        {
            public Guid Id { get; set; }

        }

        public class Handler : IRequestHandler<Query, Sport>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Sport> Handle(Query request, CancellationToken cancellationToken)
            {
                var sport = await _context.Sports.FindAsync(request.Id);

                return sport;
            }
        }
    }
}