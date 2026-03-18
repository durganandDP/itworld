import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import {
  getAuth,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

import {
  getFirestore,
  collection,
  query,
  where,
  onSnapshot,
  updateDoc,
  deleteDoc,
  doc
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyCHBt5s1tLJffmBnmjCyAefvQ_c9Oaw8-M",
  authDomain: "reviews-1b15f.firebaseapp.com",
  projectId: "reviews-1b15f",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

let unsubscribe = null;

/* LOGIN */
loginBtn.onclick = () => {
  signInWithEmailAndPassword(auth, email.value.trim(), password.value)
    .catch(err => alert(err.message));
};

/* LOGOUT */
if (typeof logoutBtn !== "undefined") {
  logoutBtn.onclick = () => signOut(auth);
}

/* AUTH STATE */
onAuthStateChanged(auth, user => {

  if (user && user.email === "admin@itworld.in") {

    loginSection.style.display = "none";
    adminPanel.style.display = "block";

    loadPendingReviewsRealtime();

  } else {

    loginSection.style.display = "block";
    adminPanel.style.display = "none";

    if (unsubscribe) unsubscribe();

    if (user) signOut(auth);
  }

});

/* REALTIME PENDING REVIEWS */
function loadPendingReviewsRealtime() {

  const q = query(
    collection(db, "reviews"),
    where("approved", "==", false)
  );

  unsubscribe = onSnapshot(q, snap => {

    pendingReviews.innerHTML = "";

    if (snap.empty) {
      pendingReviews.textContent = "No pending reviews";
      return;
    }

    snap.forEach(d => {

      const r = d.data();

      const card = document.createElement("div");
      card.className = "review-card";

      const name = document.createElement("strong");
      name.textContent = r.name;

      const stars = document.createElement("span");
      stars.textContent = " – " + "★".repeat(r.rating);

      const msg = document.createElement("p");
      msg.textContent = r.message;

      const date = document.createElement("small");
      date.textContent = new Date(r.created).toLocaleString();

      const actions = document.createElement("div");
      actions.className = "actions";

      const approveBtn = document.createElement("button");
      approveBtn.textContent = "Approve";
      approveBtn.onclick = () => approveReview(d.id);

      const deleteBtn = document.createElement("button");
      deleteBtn.textContent = "Delete";
      deleteBtn.className = "danger";
      deleteBtn.onclick = () => deleteReview(d.id);

      actions.appendChild(approveBtn);
      actions.appendChild(deleteBtn);

      card.appendChild(name);
      card.appendChild(stars);
      card.appendChild(msg);
      card.appendChild(date);
      card.appendChild(actions);

      pendingReviews.appendChild(card);

    });

  });

}

/* APPROVE */
window.approveReview = async id => {
  await updateDoc(doc(db, "reviews", id), { approved: true });
};

/* DELETE */
window.deleteReview = async id => {
  if (confirm("Delete this review?")) {
    await deleteDoc(doc(db, "reviews", id));
  }
};