// import { fakeLoan, fakeTerritory, fakeUser, fakeClient } from "../fixtures"

const Query = {
  // users: (root: any, args: any, ctx: any) => {
  //   return [fakeUser]
  // },

  // user: (root: any, args: any, ctx: any) => {
  //   return fakeUser
  // },

  me: (_: any, args: any, ctx: any) => {
    // return fakeUser
    return {
      role: "admin",
    }
  },

  // clients: (root: any, args: any, ctx: any) => {
  //   return [fakeClient]
  // },

  // client: (root: any, args: any, ctx: any) => {
  //   return fakeClient
  // },

  // territories: (root: any, args: any, ctx: any) => {
  //   return fakeTerritory
  // },

  // loan: (root: any, args: any, ctx: any) => {
  //   return fakeLoan
  // },

  // loans: (root: any, args: any, ctx: any) => {
  //   return [fakeLoan]
  // },
}

const Mutation = {

  // createUser: authenticated(async (root: any, args: any, ctx: any) => {
  //   ctx.ability.throwUnlessCan('create', User)

  //   const user = await User.create(args.input)
  //   return user
  // }),

  // updateUser: authenticated(async (root: any, args: any, ctx: any) => {
  //   const user = await User.findById(args.input.id)

  //   ctx.ability.throwUnlessCan('update', user)

  //   await user.set(args.input)
  //   await user.save()

  //   return user
  // }),

  // deleteUser: authenticated(async (_: any, args: any, ctx: any) => {
  //   ctx.ability.throwUnlessCan('delete', User)

  //   const user = await User.findByIdAndRemove(args.input.id)
  //   return user
  // }),

  // updateMe: authenticated(async (root: any, args: any, ctx: any) => {
  //   const user = ctx.user

  //   await user.set(args.input)
  //   await user.save()

  //   return user
  // }),

  createToken: (_: any, args: any): any => {
    return {
      user: {
        role: "admin",
      },
      token: "token",
    }
  },

  // createClient: authenticated(async (root: any, args: any, ctx: any) => {
  //   ctx.ability.throwUnlessCan('create', Client)

  //   args.input.territory = ctx.user.territory

  //   let client = await Client.create(args.input)

  //   return client
  // }),

  // updateClient: authenticated(async (root: any, args: any, ctx: any) => {
  //   const client = await Client.findById(args.input.id)

  //   if (args.input.territory) {
  //     ctx.ability.throwUnlessCan('update.territory', Client)
  //   }

  //   ctx.ability.throwUnlessCan('update', Client)

  //   await client.set(args.input)
  //   await client.save()

  //   await Territory.populate(client, { path: "territory" })

  //   return client
  // }),

  // deleteClient: authenticated(async (_: any, args: any) => {
  //   const client = await Client.findByIdAndRemove(args.input.id)

  //   await Territory.populate(client, { path: "territory" })

  //   return client
  // }),

  // createLoan: authenticated(async (root: any, args: any, ctx: any) => {
  //   ctx.ability.throwUnlessCan('create', Loan)

  //   const client = await Client.findById(args.input.client)
  //   const loan = await Loan.create(args.input)

  //   await client.addLoan(loan)

  //   return loan
  // }),

  // updateLoan: async (root: any, args: any, ctx: any) => {
  // },

  // calculateLoan: async (root: any, args: any, ctx: any) => {
  // },
}

export default {
  Query: () => (Query),
  Mutation: () => (Mutation),
}
