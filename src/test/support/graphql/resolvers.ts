export default {
  Query: () => ({
    hello: (root, { who }) => {
      return `Hello ${who ? who : 'C O S M O S'}`
    },
    me: (_, args) => {
      return {
        login: "login",
        role: "role",
      }
    },
  })


}


//
//
// const Query = {


//   // users: authenticated(async (root: any, args: any, ctx: any) => {
//   //   ctx.ability.throwUnlessCan('read', User)

//   //   let options: any = { _id: { $ne: ctx.user.id } }

//   //   if (args.input && args.input.role) {
//   //     options.role = args.input.role
//   //   }

//   //   const users = await User.find(options)

//   //   return users
//   // }),

//   // user: authenticated(async (root: any, args: any, ctx: any) => {
//   //   ctx.ability.throwUnlessCan('read', ctx.user)

//   //   const user = await User.findById(args.id)
//   //   return user
//   // }),

//   // me: authenticated(async (root: any, args: any, ctx: any) => {
//   //   if (!ctx.user) throw new Error("user not found")

//   //   const user = await User.findById(ctx.user.id)
//   //   return user
//   // }),

//   // clients: authenticated(async (root: any, args: any, ctx: any) => {
//   //   ctx.ability.throwUnlessCan('read', Client)

//   //   const clients = await Client.find()

//   //   await Territory.populate(clients, { path: "territory" })

//   //   return clients
//   // }),

//   // client: authenticated(async (root: any, args: any, ctx: any) => {
//   //   ctx.ability.throwUnlessCan('read', Client)

//   //   const client = await Client.findById(args.id)

//   //   await Loan.populate(client, { path: "loans" })
//   //   await Territory.populate(client, { path: "territory" })

//   //   return client
//   // }),

//   // territories: authenticated(async (root: any, args: any, ctx: any) => {
//   //   const territories = await Territory.find()
//   //   return territories
//   // }),

//   // loan: authenticated(async (root: any, args: any, ctx: any) => {
//   //   ctx.ability.throwUnlessCan('read', Loan)

//   //   const loan = await Loan.findById(args.id)

//   //   await Client.populate(loan, { path: "client" })
//   //   await Territory.populate(loan.client, { path: "territory" })

//   //   return loan
//   // }),

//   // loans: authenticated(async (root: any, args: any, ctx: any) => {
//   //   const options = args.input && args.input.client ? { "client": args.input.client } : null
//   //   let loans = await Loan.find(options)

//   //   return loans
//   // }),

// }

// const Mutation = {

//   // createUser: authenticated(async (root: any, args: any, ctx: any) => {
//   //   ctx.ability.throwUnlessCan('create', User)

//   //   const user = await User.create(args.input)
//   //   return user
//   // }),

//   // updateUser: authenticated(async (root: any, args: any, ctx: any) => {
//   //   const user = await User.findById(args.input.id)

//   //   ctx.ability.throwUnlessCan('update', user)

//   //   await user.set(args.input)
//   //   await user.save()

//   //   return user
//   // }),

//   // deleteUser: authenticated(async (_: any, args: any, ctx: any) => {
//   //   ctx.ability.throwUnlessCan('delete', User)

//   //   const user = await User.findByIdAndRemove(args.input.id)
//   //   return user
//   // }),

//   // updateMe: authenticated(async (root: any, args: any, ctx: any) => {
//   //   const user = ctx.user

//   //   await user.set(args.input)
//   //   await user.save()

//   //   return user
//   // }),

//   // createToken: async (_: any, args: any): Promise<any> => {
//   //   const { login, password } = args.input

//   //   const user = await User.findOne({ login })

//   //   if (!user) {
//   //     throw new Error("user not found")
//   //   }

//   //   if (user.blocked) {
//   //     throw new Error("user blocked, connect with admin")
//   //   }

//   //   if (!await user.comparePassword(password)) {
//   //     await user.addAttempt()
//   //     throw new Error("wrong password")
//   //   }

//   //   const token = await createJwt(user)

//   //   await user.resetAttempt()

//   //   return {
//   //     user,
//   //     token,
//   //   }
//   // },

//   // createClient: authenticated(async (root: any, args: any, ctx: any) => {
//   //   ctx.ability.throwUnlessCan('create', Client)

//   //   args.input.territory = ctx.user.territory

//   //   let client = await Client.create(args.input)

//   //   return client
//   // }),

//   // updateClient: authenticated(async (root: any, args: any, ctx: any) => {
//   //   const client = await Client.findById(args.input.id)

//   //   if (args.input.territory) {
//   //     ctx.ability.throwUnlessCan('update.territory', Client)
//   //   }

//   //   ctx.ability.throwUnlessCan('update', Client)

//   //   await client.set(args.input)
//   //   await client.save()

//   //   await Territory.populate(client, { path: "territory" })

//   //   return client
//   // }),

//   // deleteClient: authenticated(async (_: any, args: any) => {
//   //   const client = await Client.findByIdAndRemove(args.input.id)

//   //   await Territory.populate(client, { path: "territory" })

//   //   return client
//   // }),

//   // createLoan: authenticated(async (root: any, args: any, ctx: any) => {
//   //   ctx.ability.throwUnlessCan('create', Loan)

//   //   const client = await Client.findById(args.input.client)
//   //   const loan = await Loan.create(args.input)

//   //   await client.addLoan(loan)

//   //   return loan
//   // }),

//   // updateLoan: async (root: any, args: any, ctx: any) => {
//   // },

//   // calculateLoan: async (root: any, args: any, ctx: any) => {
//   // },

// }

// export default Query
