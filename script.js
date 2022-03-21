window.onload = function starter() {
  const mainContainer = document.getElementById('main-container');
  const submitBtn = document.querySelector('.submit-container');
  const textArea = document.querySelector('textarea');
  const mainCommentContentDiv = document.querySelectorAll(
    '.main-comment-content div',
  );
  const button = document.getElementsByClassName('reply-button');
  const replyBtn = document.getElementsByClassName('reply-btn');
  const mainCommentContent = document.querySelectorAll('.main-comment-content');
  const likesRatio = document.querySelectorAll('.likes-ratio');
  const replyLikesRatio = document.querySelectorAll('.reply-likes-ratio');
  const likeBtn = document.getElementsByClassName('like-btn');
  const dislikeBtn = document.getElementsByClassName('dislike-btn');
  const replyDislikeBtn = document.getElementsByClassName('reply-dislike-btn');
  const mainReplyCommentContent = document.querySelectorAll(
    '.main-reply-comment-content',
  );
  const mainReplyCommentContentDiv = document.querySelectorAll(
    '.main-reply-comment-content div',
  );
  const btn = document.getElementsByClassName('reply-btn')[0];

  const usernameHeader = document.getElementsByClassName('username-header');

  const yes = document.getElementById('yes');
  const no = document.getElementById('no');

  let strong;
  async function usersData() {
    const response = await fetch('data.json');
    const user = await response.json();

    return user;
  }
  function updateTextField(event) {
    const target = event.target.nextElementSibling;
    const paragraph = document.createElement('p');
    paragraph.textContent = target.value;
    event.target.previousElementSibling.parentElement.append(paragraph);
    target.remove();
    event.target.remove();
  }

  const showDeleteModal = (event) => {
    const modalContainer = document.querySelector('.modal-container');
    const modal = document.querySelector('.modal');
    modalContainer.classList.remove('hide');
    const parent = event.target.parentElement.parentElement.parentElement.parentElement
      .parentElement;
    yes.addEventListener('click', (e) => {
      e.stopPropagation();
      parent.remove();
      modalContainer.classList.add('hide');
    });

    no.addEventListener('click', (e) => {
      e.stopPropagation();
      modalContainer.classList.add('hide');
    });

    modal.addEventListener('click', (e) => {
      e.stopPropagation();
    });

    modalContainer.addEventListener('click', () => {
      modalContainer.classList.add('hide');
    });
  };

  const showEditModal = (event) => {
    const target = event.target.parentElement.parentElement.nextElementSibling;
    if (target.tagName === 'P') {
      const updateButton = document.createElement('button');
      updateButton.classList.add('update-btn');
      updateButton.textContent = 'UPDATE';
      target.parentElement.append(updateButton);
      const editTextField = document.createElement('textarea');
      editTextField.classList.add('edit-area');
      editTextField.textContent = target.textContent;
      editTextField.focus();
      target.parentElement.append(editTextField);
      target.remove();
      updateButton.addEventListener('click', updateTextField);
    }
  };

  function submitTheReply(event) {
    event.preventDefault();

    const hi = document.createElement("strong");
    hi.classList.add("strong");
    hi.textContent = strong;

    if (event.target.previousElementSibling.textContent !== "") {
      const paragraph = document.createElement("p");
      paragraph.textContent = event.target.previousElementSibling.value.slice(
        strong.length,
      );
      paragraph.prepend(hi);

      const efgh = document.createElement("div");
      efgh.classList.add("efgh");
      const div = document.createElement("div");
      const hr = document.createElement("hr");
      div.append(hr);
      efgh.append(div);
      const replyCommentContainer = document.createElement("div");
      replyCommentContainer.classList.add("reply-comment-container");

      const likesRatioContainer = document.createElement("div");
      likesRatioContainer.classList.add("likes-ratio");
      const likeBtnCopy = document.createElement("button");
      likeBtnCopy.classList.add("like-btn");
      const likeImgItem = document.createElement("img");
      likeImgItem.src = "icons/icon-plus.svg";
      likeBtnCopy.append(likeImgItem);
      const dislikeBtnCopy = document.createElement("button");
      dislikeBtnCopy.classList.add("dislike-btn");
      const dislikeImg = document.createElement("img");
      dislikeImg.src = "icons/icon-minus.svg";
      dislikeBtnCopy.append(dislikeImg);
      const likesCount = document.createElement("span");
      likesCount.textContent = 0;
      likesRatioContainer.append(dislikeBtnCopy);
      likesRatioContainer.prepend(likeBtnCopy);
      likesRatioContainer.insertBefore(likesCount, dislikeBtnCopy);

      replyCommentContainer.append(likesRatioContainer);
      const mainReplyCommentContentCopy = document.createElement("div");
      const mainReplyCommentContentDivCopy = document.createElement("div");
      mainReplyCommentContentCopy.classList.add("main-reply-comment-content");

      const userAvatar = document.createElement("img");
      const heading = document.createElement("h4");
      const menuOptions = document.createElement("div");

      const timeInfo = document.createElement("span");
      timeInfo.classList.add("time-info");

      usersData().then((user) => {
        userAvatar.classList.add("user-avatar");
        userAvatar.src = user.currentUser.image.png.slice(8);
        userAvatar.alt = user.currentUser.username;

        menuOptions.classList.add("menu-options");

        const deleteBtn = document.createElement("button");
        deleteBtn.classList.add("delete-btn");
        deleteBtn.textContent = "Delete";
        const trashIcon = document.createElement("img");
        trashIcon.src = "icons/icon-delete.svg";
        deleteBtn.prepend(trashIcon);
        menuOptions.append(deleteBtn);

        const editBtn = document.createElement("button");
        editBtn.classList.add("edit-btn");
        editBtn.textContent = "Edit";
        const pencil = document.createElement("img");
        pencil.src = "icons/icon-edit.svg";
        editBtn.prepend(pencil);
        menuOptions.append(editBtn);

        const markup = document.createElement("em");
        markup.textContent = "You";
        markup.classList.add("markup");

        heading.textContent = user.currentUser.username;
        heading.append(markup);

        timeInfo.textContent = "Today";

        editBtn.onclick = showEditModal;
        deleteBtn.onclick = showDeleteModal;
      });
      mainReplyCommentContentDivCopy.append(userAvatar);
      mainReplyCommentContentDivCopy.append(heading);
      mainReplyCommentContentDivCopy.append(timeInfo);
      mainReplyCommentContentDivCopy.append(menuOptions);

      mainReplyCommentContentCopy.append(mainReplyCommentContentDivCopy);
      mainReplyCommentContentCopy.append(paragraph);
      replyCommentContainer.append(mainReplyCommentContentCopy);

      efgh.append(replyCommentContainer);

      event.target.parentElement.parentElement.append(efgh);

      event.target.parentElement.remove();
    } else {
      console.log("error");
    }
  }

  function increaseLikeByOne(event) {
    const numberOfLikes = event.target.parentElement.nextElementSibling;
    numberOfLikes.textContent = parseInt(numberOfLikes.textContent, 10) + 1;
  }

  function decreaseLikeByOne(event) {
    const numberOfLike = event.target.parentElement.previousElementSibling;
    numberOfLike.textContent = parseInt(numberOfLike.textContent, 10) - 1;
  }

  function replyToComment(event) {
    let parent;

    if (event.target.tagName === "IMG") {
      parent = event.target.parentElement.parentElement.parentElement.parentElement
        .parentElement;
    } else {
      parent = event.target.parentElement.parentElement.parentElement.parentElement;
    }

    const replyingTo = parent.querySelector(".username-header");

    strong = `@${replyingTo.textContent}`;
    const form = document.createElement("form");
    form.classList.add("submit-container");

    const userAvatar = document.createElement("img");
    userAvatar.classList.add("user-avatar");
    const textField = document.createElement("textarea");

    form.addEventListener("click", submitTheReply);

    usersData().then((users) => {
      userAvatar.src = users.currentUser.image.png.slice(8);
      userAvatar.alt = users.currentUser.username;

      form.append(userAvatar);

      textField.textContent = strong;

      form.append(textField);

      const replyButton = document.createElement("button");
      replyButton.textContent = "REPLY";
      replyButton.type = "submit";
      form.append(replyButton);

      parent.append(form);
    });
  }

  usersData().then((users) => {
    for (let i = 0; i < users.comments.length; i += 1) {
      const heading = document.createElement("h4");
      heading.classList.add("username-header");

      usernameHeader[i].textContent = users.comments[i].user.username;
      mainCommentContentDiv[i].insertBefore(usernameHeader[i], button[i]);

      const timeSent = document.createElement("span");
      timeSent.classList.add("time-info");
      timeSent.textContent = users.comments[i].createdAt;

      mainCommentContentDiv[i].insertBefore(timeSent, button[i]);

      const paragraph = document.createElement("p");
      paragraph.classList.add("comment-text");

      paragraph.textContent = users.comments[i].content;
      mainCommentContent[i].append(paragraph);

      const likesCount = document.createElement("span");
      likesCount.classList.add("likes-count");

      likesCount.textContent = users.comments[i].score;
      likesRatio[i].insertBefore(likesCount, dislikeBtn[i]);

      likeBtn[i].addEventListener("click", increaseLikeByOne);
      dislikeBtn[i].addEventListener("click", decreaseLikeByOne);

      const userAvatar = document.createElement("img");
      userAvatar.classList.add("user-avatar");
      userAvatar.src = users.comments[i].user.image.png.slice(8);
      userAvatar.alt = users.comments[i].user.username;
      mainCommentContentDiv[i].prepend(userAvatar);

      button[i].addEventListener("click", replyToComment);
    }

    function replyToRepliedComment(event) {
      let parent;
      if (event.target.tagName === "IMG") {
        parent = event.target.parentElement.parentElement.parentElement.parentElement
          .parentElement.parentElement;
      } else {
        parent = event.target.parentElement.parentElement.parentElement.parentElement
          .parentElement;
      }

      const replyingTo = event.target.parentElement.parentElement.querySelector(
        ".username-header",
      );

      strong = `@${replyingTo.textContent}`;

      const form = document.createElement("form");
      form.classList.add("submit-container");

      const userAvatar = document.createElement("img");

      const textField = document.createElement("textarea");

      usersData().then((usernames) => {
        userAvatar.classList.add("user-avatar");
        userAvatar.src = usernames.currentUser.image.png.slice(8);
        userAvatar.alt = usernames.currentUser.username;

        textField.textContent = `@${replyingTo.textContent}`;

        const replyButton = document.createElement("button");
        replyButton.textContent = "REPLY";
        replyButton.type = "submit";

        form.append(userAvatar);
        form.append(textField);
        form.append(replyButton);
      });

      parent.append(form);

      form.addEventListener("click", submitTheReply);
    }

    users.comments.forEach((comment) => {
      if (comment.replies.length > 0) {
        for (let i = 0; i < 1; i += 1) {
          const heading = document.createElement("h4");
          heading.classList.add("username-header");

          heading.textContent = comment.replies[i].user.username;
          mainReplyCommentContentDiv[i].insertBefore(heading, btn);

          const timeInfo = document.createElement("span");
          timeInfo.classList.add("time-info");
          timeInfo.textContent = comment.replies[i].createdAt;

          mainReplyCommentContentDiv[i].insertBefore(timeInfo, btn);

          const likesCount = document.createElement("span");
          likesCount.classList.add("likes-count");
          likesCount.textContent = comment.replies[i].score;
          replyLikesRatio[i].insertBefore(likesCount, replyDislikeBtn[i]);

          const userAvatar = document.createElement("img");
          userAvatar.classList.add("user-avatar");
          userAvatar.src = comment.replies[i].user.image.png.slice(8);
          userAvatar.alt = comment.replies[i].user.username;
          mainReplyCommentContentDiv[i].prepend(userAvatar);

          const replyingTo = document.createElement("strong");
          replyingTo.classList.add("strong");
          replyingTo.textContent = `@${comment.replies[i].replyingTo}`;

          const paragraph = document.createElement("p");
          paragraph.classList.add("comment-text");
          paragraph.textContent = comment.replies[i].content;
          paragraph.prepend(replyingTo);
          mainReplyCommentContent[i].append(paragraph);

          replyBtn[i].addEventListener("click", replyToRepliedComment);
        }
      }
    });

    const currentUserAvatar = document.createElement('img');
    currentUserAvatar.classList.add('user-avatar');
    currentUserAvatar.src = users.currentUser.image.png.slice(8);
    currentUserAvatar.alt = users.currentUser.username;
    submitBtn.prepend(currentUserAvatar);
  });

  submitBtn.addEventListener("submit", (event) => {
    event.preventDefault();

    if (textArea.value !== "") {
      usersData().then((users) => {
        const newComment = document.createElement("p");
        newComment.classList.add("comment-text");
        newComment.textContent = textArea.value;

        const likesRatioContainer = document.createElement("div");
        likesRatioContainer.classList.add("likes-ratio");
        const likeBtnCopy = document.createElement("button");
        likeBtnCopy.classList.add("like-btn");
        const likeImg = document.createElement("img");
        likeImg.src = "icons/icon-plus.svg";
        likeBtnCopy.append(likeImg);
        const dislikeBtnCopy = document.createElement("button");
        dislikeBtnCopy.classList.add("dislike-btn");
        const dislikeImg = document.createElement("img");
        dislikeImg.src = "icons/icon-minus.svg";
        dislikeBtnCopy.append(dislikeImg);
        const likesCount = document.createElement("span");
        likesCount.textContent = 0;
        likesRatioContainer.append(dislikeBtnCopy);
        likesRatioContainer.prepend(likeBtnCopy);
        likesRatioContainer.insertBefore(likesCount, dislikeBtnCopy);

        const mainCommentSection = document.createElement("div");
        mainCommentSection.classList.add("main-comment-content");
        const mainCommentSectionDiv = document.createElement("div");
        const heading = document.createElement("h4");
        const markup = document.createElement("em");
        markup.textContent = "You";
        markup.classList.add("markup");
        heading.textContent = users.currentUser.username;
        heading.append(markup);
        mainCommentSectionDiv.append(heading);

        const userAvatar = document.createElement("img");
        userAvatar.classList.add("user-avatar");
        userAvatar.src = users.currentUser.image.png.slice(8);
        userAvatar.alt = users.currentUser.username;
        mainCommentSectionDiv.prepend(userAvatar);

        const menuOptions = document.createElement("div");
        menuOptions.classList.add("menu-options");

        const deleteBtn = document.createElement("button");
        deleteBtn.classList.add("delete-btn");
        deleteBtn.textContent = "Delete";
        const trashIcon = document.createElement("img");
        trashIcon.src = "icons/icon-delete.svg";
        deleteBtn.prepend(trashIcon);
        menuOptions.append(deleteBtn);

        const editBtn = document.createElement("button");
        editBtn.classList.add("edit-btn");
        editBtn.textContent = "Edit";
        const pencil = document.createElement("img");
        pencil.src = "icons/icon-edit.svg";
        editBtn.prepend(pencil);
        menuOptions.append(editBtn);
        mainCommentSectionDiv.append(menuOptions);
        mainCommentSectionDiv.classList.add("menu-container");

        mainCommentSection.prepend(mainCommentSectionDiv);
        mainCommentSection.append(newComment);

        const commentContainer = document.createElement("div");
        commentContainer.classList.add("comment-container");
        commentContainer.append(mainCommentSection);
        commentContainer.prepend(likesRatioContainer);

        const abcd = document.createElement('div');
        abcd.classList.add('abcd');
        abcd.append(commentContainer);

        mainContainer.insertBefore(abcd, submitBtn);

        editBtn.onclick = showEditModal;
        deleteBtn.onclick = showDeleteModal;

        submitBtn.reset();
      });
    } else {
      console.log('Please enter a value');
    }
  });
};
