using System;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Presistence;

namespace Application.Households
{
    public class HouseholdsDetails
    {
        public class Query : IRequest<Household>
        {
            public Guid Id { get; set; }

        }

        public class Handler : IRequestHandler<Query, Household>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Household> Handle(Query request, CancellationToken cancellationToken)
            {
                var household = await _context.Households.FindAsync(request.Id);

                return household;
            }
        }
    }
}