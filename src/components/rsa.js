import React from "react";

const rsa = () => {
  let prime = new Set();
  let public_key = null;
  let private_key = null;
  let n = null;

  function gcd(a, b) {
    if (b === 0) return a;
    return gcd(b, a % b);
  }

  function primefiller() {
    let sieve = new Array(250).fill(true);
    sieve[0] = false;
    sieve[1] = false;
    for (let i = 2; i < 250; i++) {
      for (let j = i * 2; j < 250; j += i) {
        sieve[j] = false;
      }
    }

    for (let i = 0; i < sieve.length; i++) {
      if (sieve[i]) {
        prime.add(i);
      }
    }
  }



  function setkeys() {
    let prime1 = 11;
    let prime2 = 17;

    n = prime1 * prime2;
    let fi = (prime1 - 1) * (prime2 - 1);

    let e = 2;
    while (true) {
      if (gcd(e, fi) === 1) {
        break;
      }
      e++;
    }

    public_key = e;

    let d = 2;
    while (true) {
      if ((d * e) % fi === 1) {
        break;
      }
      d++;
    }

    private_key = d;
  }

  function encrypt(message) {
    let e = public_key;
    let encrypted_text = 1;
    while (e > 0) {
      encrypted_text *= message;
      encrypted_text %= n;
      e--;
    }
    return encrypted_text;
  }

  function decrypt(encrypted_text) {
    let d = private_key;
    let decrypted = 1;
    while (d > 0) {
      decrypted *= encrypted_text;
      decrypted %= n;
      d--;
    }
    return decrypted;
  }

  function encoder(message) {
    let encoded = [];
    for (let i = 0; i < message.length; i++) {
      encoded.push(encrypt(message.charCodeAt(i)));
    }
    return encoded;
  }

  function decoder(encoded) {
    let s = "";
    for (let i = 0; i < encoded.length; i++) {
      s += String.fromCharCode(decrypt(encoded[i]));
    }
    return s;
  }

  primefiller();
  setkeys();
  let message = "Test Message";
  let coded = encoder(message);

  console.log("Initial message:");
  console.log(message);
  console.log("\n\nThe encoded message(encrypted by public key)\n");
  console.log(coded.join(" "));
  console.log("\n\nThe decoded message(decrypted by public key)\n");
  console.log(decoder(coded));
  return <div></div>;
};

export default rsa;
