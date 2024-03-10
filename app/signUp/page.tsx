'use client'

import { registerUser } from "@/src/utils/registerNewUser";

export default function SignUp() {

    return (
        <button onClick={() => registerUser('gerda', 'email', 'pass')}>hello</button>
    )
}