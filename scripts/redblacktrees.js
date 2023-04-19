const sizeOfNode = 3
const roundnessOffsetOfNode = sizeOfNode - (sizeOfNode/Math.sqrt(2));

class Node
{
    constructor(value = 0, previous = null, isRed = true, left = null, right = null)
    {
        this.value = value;
        this.left = left;
        this.right = right;
        this.previous = previous;
        this.isRed = isRed;
        this.isHighlighted = false;
    }
    value;
    left;
    right;
    previous;
    isRed;
    isHighlighted
    static root = null;

    clone() {
        return new Node(this.value, this.previous, this.isRed, this.left, this.right);
    }

    static height(){
        if (Node.root == null) return 0;
        return Node.root.checkHeight();
    }

    checkHeight(i = 1)
    {
        let vLeft, vRight;
        if (this.left != null) {
            vLeft = this.left.checkHeight(i + 1);
        } else {
            vLeft = i;
        }

        if (this.right != null) {
            vRight = this.right.checkHeight(i + 1);
        } else {
            vRight = i;
        }

        if(vLeft>vRight)
        {
            return vLeft;
        }
        else{
            return vRight;
        }
    }

    isOk() {
        if (this.left!=null) {
            if (this.left.previous != this || !this.left.isOk()) {
                return false;
            } 
        }

        if (this.right!=null) {
            if (this.right.previous != this || !this.right.isOk()) {
                return false;
            }
        }
        return true;
    }

    static isItOk() {
        if (Node.root == null) {
            return true;
        }
        if (Node.root.previous!=null) {
            return false;
        }
        return Node.root.isOk();
    }


    setRed(Red)
    {
        this.isRed=Red;
    }

    rotateToLeft(){
        if (this.right!=null) {
            if (this.previous != null) {
                if (this==this.previous.right) {//right child to its parent
                    this.previous.right = this.right; //replace rotated node with its right child
                    this.right.previous = this.previous; //connect from the other side
                    this.right = this.previous.right.left; //replace what used to be right child with its left child
                    if (this.right != null) {
                        this.right.previous = this; //connect the other way
                    }
                    this.previous.right.left = this; //place this as left child to what used to be its right child
                    this.previous = this.previous.right; //connect the other way
                } else {//left child to its parent
                    this.previous.left = this.right; //replace rotated node with its right child
                    this.right.previous = this.previous; //connect from the other side
                    this.right = this.previous.left.left; //replace what used to be right child with its left child
                    if (this.right != null) {
                        this.right.previous = this; //connect the other way
                    }
                    this.previous.left.left = this; //place this as left child to what used to be its right child
                    this.previous = this.previous.left; //connect the other way
                }
            } else {//root
                Node.root = this.right; //replace root with its right child
                Node.root.previous = null; //disconnet previous of new root from anything
                this.right = Node.root.left; //replace what used to be right child with its left child
                if (this.right != null) {
                    this.right.previous = this; //connect the other way
                }
                Node.root.left = this; //place this as left child to what used to be its right child
                this.previous = Node.root; //connect the other way
            }
        }
    }

    rotateToRight(){
        if (this.left!=null) {
            if (this.previous != null) {
                if (this==this.previous.right) {//right child to its parent
                    this.previous.right = this.left; //replace rotated node with its left child
                    this.left.previous = this.previous; //connect from the other side
                    this.left = this.previous.right.right; //replace what used to be left child with its right child
                    if (this.left != null) {
                        this.left.previous = this; //connect the other way
                    }
                    this.previous.right.right = this; //place this as right child to what used to be this's left child
                    this.previous = this.previous.right; //connect the other way
                } else {//left child to its parent
                    this.previous.left = this.left; //replace rotated node with its left child
                    this.left.previous = this.previous; //connect from the other side
                    this.left = this.previous.left.right; //replace what used to be left child with its left child
                    if (this.left != null) {
                        this.left.previous = this; //connect the other way
                    }
                    this.previous.left.right = this; //place this as left child to what used to be its right child
                    this.previous = this.previous.left; //connect the other way
                }
            } else {//root
                Node.root = this.left; //replace root with its left child
                Node.root.previous = null; //disconnet previous of new root from anything
                this.left = Node.root.right; //replace what used to be right child with its left child
                if (this.left != null) {
                    this.left.previous = this; //connect the other way
                }
                Node.root.right = this; //place this as right child to what used to be its right child
                this.previous = Node.root; //connect the other way
            }
        }
    }

/*
    rotateLeftChildToLeft(){ //rotate Left child left
        if (this.left != null && this.left.right != null) { //left child is not null and right child of left child is not null
            let tmp = this.left; //remember left child
            this.left = this.left.right //replace left child with its right child
            tmp.right = this.left.left //put in place of what used to be this->left->right - what used to be this->left->right->left (it doesn't matter what it is)
            this.left.left = tmp; //remembered Node replaces what got connected to it
        }
    }

    rotateLeftChildToRight(){
        if (this.left != null && this.left.left != null) {  //left child is not null and left child of left child is not null
            let tmp = this.left; //remember left child
            this.left = this.left.left; //replace left child with its left child
            tmp.left = this.left.right //put in place of what used to be this->left->left - what used to be this->left->left->right (it doesn't matter what it is)
            this.left.right = tmp; //remembered Node replaces what got connected to it
        }
    }

    rotateRightChildToLeft(){ //rotate Left child left
        if (this.right != null && this.right.right != null) { //right child is not null and right child of right child is not null
            let tmp = this.right; //remember right child
            this.right = this.right.right //replace right child with its right child
            tmp.right = this.right.left //put in place of what used to be this->right->right - what used to be this->right->right->left (it doesn't matter what it is)
            this.right.left = tmp; //remembered Node replaces what got connected to it
        }
    }

    rotateRightChildToRight(){
        if (this.right != null && this.right.left != null) {  //right child is not null and left child of right child is not null
            let tmp = this.right; //remember right child
            this.right = this.right.left; //replace right child with its left child
            tmp.left = this.right.right //put in place of what used to be this->right->left - what used to be this->right->left->right (it doesn't matter what it is)
            this.right.right = tmp; //remembered Node replaces what got connected to it
        }
    }
*/

    getUncle() { //child of grandparent different than parent
        if (this.previous.previous.left == null || this.previous.previous.right == null) { //if one of grandparent's children == null it's uncle
            return null;
        }
        if (this.previous.value!=this.previous.previous.left.value) { //if parent and left child of grandparent are different
            return this.previous.previous.left; //then return left child of grandparent
        } else {
            return this.previous.previous.right; //else return right child of grandparent
        }
    }

    getSibling() {
        if (this.previous!=null) {
            return this==this.previous.left ? this.previous.right : this.previous.left;
        }
        return null;
    }

    getCloseNephew() {
        let sibling = this.getSibling();
        if (sibling != null && sibling.previous != null) {
            if (sibling == sibling.previous.right) {
                return this.previous.right.left;
            } else {
                return this.previous.left.right;
            }
        }
        return null;
    }

    getDistantNephew() {
        let sibling = this.getSibling();
        if (sibling != null && sibling.previous != null) {
            if (sibling == sibling.previous.right) {
                return this.previous.right.right;
            } else {
                return this.previous.left.left;
            }
        }
        return null;
    }



    insertCaseSearcher() {
        if (this.previous!=null) {
            if (this.previous.isRed == false) { //parent is black
                this.insertCaseParentBlack();
            }
            if (this.previous.isRed == true) { //parent is red
                if (this.previous.previous==null) { //parent is root
                    this.insertCaseParentRedRoot();
                } else { //parent is not root and red -> parent of parent is black
                    let uncle = this.getUncle();
                    if (uncle != null && uncle.isRed == true) {
                        this.insertCaseUncleRed();
                    } else {
                        if
                         ((this == this.previous.right && this.previous == this.previous.previous.left) ||
                         (this == this.previous.left && this.previous == this.previous.previous.right)){ //inner child
                            this.insertCaseInnerChild();
                        } else { //outer child
                            this.insertCaseOuterChild();
                        }
                    }
                }


            }
        } else { //insert root
            this.insertCaseRoot();
        }
    }

    insertCaseRoot() {
        return;
    }

    insertCaseParentBlack() {
        return;
    }

    insertCaseParentRedRoot() {
        this.previous.setRed(false);
    }

    insertCaseUncleRed() {
        this.previous.setRed(false);
        this.getUncle().setRed(false);
        this.previous.previous.setRed(true);
        this.previous.previous.insertCaseSearcher();
    }

    insertCaseInnerChild() {
        if (this == this.previous.right) { //child is to the right of the parent
            this.previous.rotateToLeft();
            this.left.insertCaseOuterChild();
        } else { //child is to the left of the parent
            this.previous.rotateToRight();
            this.right.insertCaseOuterChild();
        }
    }

    insertCaseOuterChild() {
        this.previous.setRed(false);
        this.previous.previous.setRed(true);
        if (this.previous == this.previous.previous.right) { //parent is to the right of the grandparent
            this.previous.previous.rotateToLeft();
        } else { //parent is to the left of the grandparent
            this.previous.previous.rotateToRight();
        }
    }

    static addNode(newNode)
    {
        if(Node.root != null)
        {
            let tmp = Node.root; //temporary pointer to go down the tree
            let shouldItEnd = false; //a variable meant to signify finding the end of the tree
            do {
                if(newNode.value>tmp.value){ //values bigger then current go to the right
                    if(tmp.right != null){ //if there is anything to the right and new Node has a greater value we continue going down the tree
                        tmp = tmp.right;
                    } else { //otherwise if the right side is empty we can add the new Node to it

                        tmp.right = newNode;
                        newNode.previous = tmp;
                        shouldItEnd = true;
                    }
                } else {   //values equal or smaller than current go to the left

                    if(tmp.left != null) //if there is anything to the left and new Node has a smaller or equal value we continue going down the tree
                    {
                        tmp = tmp.left;
                    }
                    else {   //otherwise if the left side is empty we can add the new Node to it
                        tmp.left = newNode;
                        newNode.previous = tmp;
                        shouldItEnd = true;
                    }
                }
            } while(!shouldItEnd)
        }
        else {
            Node.root = newNode;
        }
        newNode.insertCaseSearcher();
    }

    deleteCaseRootChildless(){
        Node.root = null;
    }

    deleteCaseBlackParentBlackSiblingBlackNephew(){
        this.getSibling().isRed = true;
        this.previous.deleteCaseBlackLeaf();
    }

    deleteCaseSiblingRed() {
        this.previous.isRed = true;
        this.getSibling().isRed = false;
        this == this.previous.left ? this.previous.rotateToLeft() : this.previous.rotateToRight();

        if (this.getDistantNephew()!=null && this.getDistantNephew().isRed == true) {
            this.deleteCaseRedDistantNephew();
        } else {
            if (this.getCloseNephew()!=null && this.getCloseNephew().isRed == true) {
                this.deleteCaseRedCloseNephew();
            } else { 
                this.deleteCaseRedParentBlackNephews()
            }
        }
        // this.deleteCaseBlackLeaf();
    }

    deleteCaseRedParentBlackNephews() {
        this.previous.isRed = false;
        this.getSibling().isRed = true;
    }

    deleteCaseRedDistantNephew() {
        let sibling = this.getSibling();
        let distantNephew = this.getDistantNephew();
        this == this.previous.left ? this.previous.rotateToLeft() : this.previous.rotateToRight();
        sibling.isRed = this.previous.isRed;
        this.previous.isRed = false;
        distantNephew.isRed = false;
    }

    deleteCaseRedCloseNephew() {
        let sibling = this.getSibling();
        //let closeNephew = this.getCloseNephew();
        this == this.previous.left ? sibling.rotateToRight() : sibling.rotateToLeft();
        sibling.isRed = true;
        sibling.previous.isRed = false;
        this.deleteCaseRedDistantNephew();
    }

    deleteCaseSingleChild() {
        if (this.left!=null) {
            this.left.isRed = false;
            if (this.previous!=null) {
                //console.log(this.previous.value + "<-- this  left-->" + this.previous.left.value + "<--left  right-->" + this.previous.right.value +" <-- right  isLeft-->"+ (this == this.previous.left));
                if (this == this.previous.left) {
                    this.previous.left = this.left;
                } else {
                    this.previous.right = this.left;
                }
                //console.log("caseSingleChild -- left");
                this.left.previous = this.previous;
                this.previous = this.left;
            } else {
                Node.root = this.left;
                Node.root.previous = null;
            }
        } else {
            this.right.isRed = false;
            if (this.previous!=null) {
                this == this.previous.left ? this.previous.left = this.right : this.previous.right = this.right;
                this.right.previous = this.previous;
                this.previous = this.right;
            } else {
                Node.root = this.right;
                Node.root.previous = null;
            }
        }
    }


    deleteCaseBlackLeaf() {
        if (this.previous !=null) {
            let sibling = this.getSibling();
            let closeNephew = this.getCloseNephew();
            let distantNephew = this.getDistantNephew();
            if (sibling.isRed == false) { //sibling is black and cannot be null
                if (distantNephew == null || distantNephew.isRed == false) {//distant nephew is black
                    if (closeNephew == null || closeNephew.isRed == false) {//close nephew is black
                        if (this.previous.isRed == false) { //parent is black
                            this.deleteCaseBlackParentBlackSiblingBlackNephew();
                        } else { //parent is red
                            this.deleteCaseRedParentBlackNephews();
                        }
                    } else { //close nephew is red
                        this.deleteCaseRedCloseNephew();
                    }
                } else { //distant nephew is red
                    this.deleteCaseRedDistantNephew();
                }
            } else {//sibling is red -> nephews are black
                this.deleteCaseSiblingRed()
            }
        } 
    }

    deleteCaseTwoChilderen() {
        let tmpSearch = this.right;
        let tmpSwap = this.clone();
        while (tmpSearch.left != null) {
            tmpSearch = tmpSearch.left;
        }
        if (tmpSearch == this.right) {
            this.previous = tmpSearch;
            this.right = tmpSearch.right;
            this.right != null ? this.right.previous = this : {};
            tmpSearch.right = this
        } else {
            this.previous = tmpSearch.previous;
            if (this.previous != null) { //??
                this.previous.left == tmpSearch ? this.previous.left = this : this.previous.right = this;
            }
            this.right = tmpSearch.right;
            this.right != null ? this.right.previous = this : {};
            tmpSearch.right = tmpSwap.right;
            tmpSearch.right.previous = tmpSearch;

        }
        tmpSearch.previous = tmpSwap.previous;
        if (tmpSearch.previous != null) {
            //if 'this' was a left child it needs to be connected to left
            tmpSearch.previous.left == this ?  tmpSearch.previous.left = tmpSearch : tmpSearch.previous.right = tmpSearch;
        } else {
            Node.root = tmpSearch;
        }
        
        tmpSearch.left = tmpSwap.left;
        tmpSearch.left != null ? tmpSearch.left.previous = tmpSearch : {};

        this.left = null;
        this.isRed = tmpSearch.isRed;
        tmpSearch.isRed = tmpSwap.isRed;
        this.deleteCaseSearcher();
    }

    deleteCaseSearcher() {
        Node.printTree();
        // console.log(Node.isItOk() ? "wszystko dobrze" : "tragedia się dzieje");
        if (this.previous!=null) { //removed element is not root
            if (this.left == null && this.right == null) { //no children
                // if (this.previous!=null) { //removed element is not root
                    if (this.isRed==false) { //removed element is a black leaf
                        this.deleteCaseBlackLeaf();
                    } else { //element is red and has no children
                        //this.deleteCaseNotRootNoChildren();
                    }

                // } else { //removed element is root and has no children
                //     this.deleteCaseRootChildless()
                // }
            } else { //one child
                if (this.left == null || this.right == null) {
                    this.deleteCaseSingleChild();
                }
                else { //two children
                    this.deleteCaseTwoChilderen();
                }
            }
        } else { //removed element is root
            if (this.left == null && this.right == null) { //root doesn't have children
                this.deleteCaseRootChildless();
            } else {
                if (this.left == null || this.right == null) {
                    this.deleteCaseSingleChild()
                } else {
                    this.deleteCaseTwoChilderen();
                }
            }
        }
        if (this.previous!=null) {
            this == this.previous.left ? this.previous.left = null : this.previous.right = null;    
        }
        
    }

    static removeNode(val) {
        if (Node.root!=null) {
            let tmp = Node.root;
            if (tmp.value == val) {
                tmp.deleteCaseSearcher();
                // if (tmp!=null && tmp!=Node.root) {
                    // tmp == tmp.previous.left ? tmp.previous.left = null : tmp.previous.right = null;
                // }
            } else {
                
                let shouldItEnd;
                do {
                    if (val == tmp.value) { //found element to remove
                        tmp.deleteCaseSearcher(); //this method pushes to leaf
                        shouldItEnd = true;
                    } else {
                        if(val>tmp.value){ //values bigger then current go to the right
                            if(tmp.right != null) //if there is anything to the right and new Node has a greater value we continue going down the tree
                            {
                                tmp = tmp.right;
                            }
                            else{ //otherwise if the right side is empty we can add the new Node to it
                                shouldItEnd = true;
                            }
                        } else {   //values equal or smaller than current go to the left
                            if(tmp.left != null) { //if there is anything to the left and new Node has a smaller or equal value we continue going down the tree
                                tmp = tmp.left;
                            } else {   //otherwise if the left side is empty we can add the new Node to it
                                shouldItEnd = true;
                            }
                        }
                    }
                } while(!shouldItEnd)
            }
        }
   }

    static getNodeByValue(value) {
        if (Node.root!=null) {
            if (Node.root.value == value) {
                return Node.root;
            } else {
                let tmp = Node.root;
                // let shouldItEnd;
                do {
                    if (value == tmp.value) { //found element to remove
                        return tmp;
                    } else {
                        if(value>tmp.value){ //values bigger then current go to the right
                            if(tmp.right != null) //if there is anything to the right and new Node has a greater value we continue going down the tree
                            {
                                tmp = tmp.right;
                            } else {
                                return null;
                            }
                        } else {   //values equal or smaller than current go to the left
                            if(tmp.left != null) { //if there is anything to the left and new Node has a smaller or equal value we continue going down the tree
                                tmp = tmp.left;
                            } else {   //otherwise if the left side is empty we can add the new Node to it
                                return null;
                            }
                        }
                    }
                } while(true);
            }
        }
    }

    static highlightNode(value, highlightTime) {
        let tmp = Node.getNodeByValue(value);
        if (tmp!=null) {
            tmp.isHighlighted = true;
            // drawTree();
            setTimeout(() => {
                tmp.isHighlighted = false;
                drawTree();
            }, highlightTime);
        }
        drawTree();
    }


    destroyNode() {
        if (this.left!=null) {
            this.left.destroyNode();
        }
        if (this.right!=null) {
            this.right.destroyNode();
        }
        delete this;
    }

    static destroyTree() {
        if (Node.root != null) {
            Node.root.destroyNode();
            Node.root = null;
        }
    }

   //rotations and actual colors i guess
    pushToConsole()
    {
        if(this.left!=null) this.left.pushToConsole();
        console.log(JSON.parse(JSON.stringify(this.value)));
        if(this.right!=null) this.right.pushToConsole();
        return ;
    }

    static printTree(){ //print first element, then recurrently print it's children as a pair
        if (Node.root != null) {
            const parent = document.getElementById("fortree");
            parent.innerHTML = "";
            let treeHeight = Node.height();
            parent.style.height = (treeHeight * 4 /* + (space between nodes on Y axis * tree height) */) + 2 + "em";
            // let startingValueX = (2 * treeHeight - 1) * sizeOfNode/2;
            // let startingValueX = (2 * (treeHeight - 1)) * sizeOfNode;
            parent.appendChild(makeAnElement("div", "node " + (Node.root.isHighlighted ? "highlight " : "")  + (Node.root.isRed ? "red" : "black"), "<p>"+Node.root.value+"</p>", 2 * (treeHeight - 1) * sizeOfNode + "em", "1em"));
            //this.printChildren(parent, (2 * treeHeight) * sizeOfNode, 0, 30, 0.5, 4);
            Node.root.printChildren(parent, 2 * (treeHeight - 1) * sizeOfNode, 1, 2 * (treeHeight - 1) * sizeOfNode, 0.5, 4);
        } else {
            document.getElementById("fortree").innerHTML = "";
        }
        
    }

    printChildren(parentElement, prevOffsetX, prevOffsetY, offsetX, diminishX, offsetY){
        let newOffsetX = offsetX * diminishX;
        if (this.left!=null) {
            parentElement.appendChild(makeAnElement("div", "node "  + (this.left.isHighlighted ? "highlight " : "") + (this.left.isRed ? "red" : "black"), "<p>"+this.left.value+"</p>", "calc(" + prevOffsetX + "em - " + newOffsetX + "em)", prevOffsetY + offsetY + "em"));
            //here print line
            //parentElement.appendChild(makeAnElement("div", "line-box l-left", "", (prevOffsetX - newOffsetX - roundnessOffsetOfNode) + "em"), (prevOffsetY - roundnessOffsetOfNode) + "em", (newOffsetX + roundnessOffsetOfNode * 2) + "em", (offsetY + roundnessOffsetOfNode * 2) + "em");
            this.left.printChildren(parentElement, prevOffsetX - newOffsetX, prevOffsetY + offsetY, offsetX * diminishX, diminishX, offsetY);
        }
        if (this.right!=null) {
            parentElement.appendChild(makeAnElement("div", "node " + (this.right.isHighlighted ? "highlight " : "") + (this.right.isRed ? "red" : "black"), "<p>"+this.right.value+"</p>", "calc(" + prevOffsetX + "em + " + newOffsetX + "em)", prevOffsetY + offsetY + "em"));
            //here print line
            //
            this.right.printChildren(parentElement, prevOffsetX + newOffsetX, prevOffsetY + offsetY, offsetX * diminishX, diminishX, offsetY);
        }
    }
}

function makeAnElement(tag, classCSS, htmlInside, offsetLeft, offsetTop, width = null, height = null){
    let element = document.createElement(tag);
    element.innerHTML = htmlInside;
    element.className = classCSS;
    element.style.top = offsetTop;
    element.style.left = offsetLeft;
    if (height!=null) {
        element.style.height = height;
    }
    if (width!=null) {
        element.style.width = width;
    }
    return element;
}

function simplyAdd()
{
    let i = parseInt(document.getElementById("givenumber").value);
    Number.isInteger(i) ? Node.addNode(new Node(i)) : console.log("input is not a Number");
    document.getElementById("givenumber").value = "";
    document.getElementById("givenumber").focus();
    drawTree();
    return ;
}


function simplyRemove() {
    Node.removeNode(parseInt(document.getElementById("givenumber").value));
    document.getElementById("givenumber").value = "";
    document.getElementById("givenumber").focus();
    drawTree();
    return ;
}

// function simplyPush() {
//     if(Node!= null) {
//         Node.root.pushToConsole();
//     } else {
//         console.log("bruh..")
//     }
//     return ;
// }

function drawTree() {
   Node.printTree();
}

function highlightElement() {
    Node.highlightNode(parseInt(document.getElementById("givenumber").value), 10*1000);
    document.getElementById("givenumber").focus();
    drawTree();
}

function killTree() {
    Node.destroyTree();
    drawTree();

}

function startTrees() { //add listners, read motive
    document.getElementById("add-btn").addEventListener("click", simplyAdd);
    document.getElementById("rem-btn").addEventListener("click", simplyRemove);
    document.getElementById("hig-btn").addEventListener("click", highlightElement);
    document.getElementById("kil-btn").addEventListener("click", killTree);
    


    let key = 1;

    switch (key) {
        case 1:
            Node.addNode(new Node(100));
            Node.addNode(new Node(50));
            Node.addNode(new Node(20));
            Node.addNode(new Node(70));
            Node.addNode(new Node(150));
            Node.addNode(new Node(120));
            Node.addNode(new Node(170));
            Node.addNode(new Node(10));
            Node.addNode(new Node(30));
            //Node.addNode(new Node(70));
            Node.addNode(new Node(60));
            Node.addNode(new Node(90));
            Node.addNode(new Node(80));
            Node.addNode(new Node(110));
            Node.addNode(new Node(130));
            Node.addNode(new Node(160));
            Node.addNode(new Node(190));
            Node.addNode(new Node(180));
            Node.addNode(new Node(200));
            Node.addNode(new Node(210));
            Node.addNode(new Node(195));
            Node.addNode(new Node(197));
            Node.addNode(new Node(193));
            
            // Node.removeNode(10);
            // Node.removeNode(30);

            
            // Node.removeNode(150);
            // Node.removeNode(160);
            // Node.removeNode(170);
            // Node.removeNode(180);
            // Node.removeNode(190);
            // Node.removeNode(193);
            // Node.removeNode(195);
            // Node.removeNode(197);
            // Node.removeNode(200);
            // Node.removeNode(100);
            // Node.removeNode(110);
            // Node.removeNode(120);
            // Node.removeNode(90);
            // Node.removeNode(80);


            // Node.removeNode(130);
            

            break;



        case 2:
            Node.addNode(new Node(5));
            Node.addNode(new Node(3));
            Node.addNode(new Node(7));
            Node.addNode(new Node(2));
            Node.addNode(new Node(4));
            Node.addNode(new Node(9));
            break;

        case 3:
                setInterval(() => { Node.addNode(new Node(Math.floor(Math.random() * 10000)));
                drawTree(); }, 800);
                break;

        case 4:
                for (let i = 0; i < 64; i++) {
                    Node.addNode(new Node(i*10));                    
                }
                break;

        case 5:
            Node.addNode(new Node(70));
            Node.addNode(new Node(50));
            Node.addNode(new Node(90));
            Node.addNode(new Node(60));
            Node.addNode(new Node(20));
            Node.addNode(new Node(80));
            Node.addNode(new Node(210));
    }

    drawTree();
}