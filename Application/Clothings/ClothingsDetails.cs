using System;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Presistence;

namespace Application.Clothings
{
    public class ClothingsDetails
    {
        public class Query : IRequest<Clothing>
        {
            public Guid Id { get; set; }

        }

        public class Handler : IRequestHandler<Query, Clothing>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Clothing> Handle(Query request, CancellationToken cancellationToken)
            {
                var clothing = await _context.Clothings.FindAsync(request.Id);

                return clothing;
            }
        }
    }
}