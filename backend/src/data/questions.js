

const PROBLEMS = [
  // ─── Day 1: Arrays Part 1 ───────────────────────────────────────────────
  {
    title: "Majority Element",
    topic: "Arrays",
    difficulty: "easy",
    day: 1,
    pattern: "Boyer-Moore Voting",
    description:
      "Given an array nums of size n, return the majority element. The majority element is the element that appears more than ⌊n / 2⌋ times. You may assume that the majority element always exists in the array.",
    intuition:
      "If a majority element exists, it appears more than n/2 times. Think of it as votes — every non-majority element can cancel out one majority vote, but the majority always survives because it has more votes than all others combined.",
    approach:
      "Boyer-Moore Voting: maintain a candidate and a count. Iterate through the array — if count is 0, set the current element as candidate. If current equals candidate, increment count; otherwise decrement. At the end the candidate is the majority element.",
    timeComplexity: "O(n)",
    spaceComplexity: "O(1)",
    companies: ["Amazon", "Microsoft", "Google"],
    hints: [
      "Think about what happens when two different elements cancel each other out — which element survives?",
      "If you pair every non-majority element with a distinct majority element, you still have majority elements left over.",
      "Boyer-Moore Voting: keep a `candidate` and `count`. When count hits 0, reset candidate to current element.",
      "Iterate once: count++ if arr[i]==candidate, else count--. Reset candidate when count==0.",
      "candidate=nums[0], count=1. For i in 1..n: if nums[i]==candidate count++ else count--; if count==0 candidate=nums[i], count=1. Return candidate.",
    ],
  },
  {
    title: "Repeat and Missing Number",
    topic: "Arrays",
    difficulty: "easy",
    day: 1,
    pattern: "Math / XOR",
    description:
      "Given an array of size n containing numbers from 1 to n, exactly one number appears twice and one number is missing. Find both the repeating and the missing number.",
    intuition:
      "Use the expected sum and expected sum of squares of 1..n. The difference between actual and expected sums gives you one equation; the difference of squares gives you another. Solve the two-variable system.",
    approach:
      "Compute S = sum(array) - n*(n+1)/2 and S2 = sum(array²) - n*(n+1)*(2n+1)/6. Then S = repeat - missing and S2 = repeat² - missing². Divide S2 by S to get repeat + missing. Solve for both.",
    timeComplexity: "O(n)",
    spaceComplexity: "O(1)",
    companies: ["Amazon", "Microsoft"],
    hints: [
      "The difference between the actual array sum and the expected 1-to-n sum equals (repeat − missing).",
      "Use sum of squares: sum(arr²) − expected sum of squares gives you (repeat² − missing²).",
      "You have two equations: (A−B) and (A²−B²). Factor A²−B² = (A−B)(A+B) to find A+B.",
      "Once you have A−B and A+B, simple algebra gives A = ((A−B)+(A+B))/2 and B = A − (A−B).",
      "S1 = Σarr[i] − n(n+1)/2, S2 = Σarr[i]² − n(n+1)(2n+1)/6. A+B = S2/S1. repeat=(S1+A+B)/2, missing=repeat−S1.",
    ],
  },
  {
    title: "Merge 2 Sorted Arrays Without Extra Space",
    topic: "Arrays",
    difficulty: "easy",
    day: 1,
    pattern: "Two Pointers / Gap Method",
    description:
      "Given two sorted arrays arr1 of size m and arr2 of size n, merge them in-place so that arr1 and arr2 together form the merged sorted sequence without using extra space.",
    intuition:
      "The Shell-sort gap method works here: treat both arrays as one conceptual array, compare elements at distance `gap`, swap if out of order, and keep halving the gap until it reaches 1.",
    approach:
      "Start with gap = ceil((m+n)/2). Compare elements at positions i and i+gap across the combined virtual array; swap if arr[i] > arr[i+gap]. Halve the gap and repeat until gap < 1. Edge: if gap crosses boundary between arr1 and arr2 adjust indices accordingly.",
    timeComplexity: "O((m+n) log(m+n))",
    spaceComplexity: "O(1)",
    companies: ["Microsoft", "Google"],
    hints: [
      "Think of both arrays laid end-to-end as one virtual array — you need to sort this without allocating it.",
      "Shell sort's gap technique can sort in-place: compare elements `gap` apart and swap if needed.",
      "Compute gap = ceil(total/2). One pass compares (0, gap), (1, gap+1), etc. across the virtual array.",
      "When i < m and j = i+gap >= m, you're comparing arr1[i] with arr2[j-m]. When i >= m you compare within arr2.",
      "gap = (m+n+1)/2. while gap>=1: compare+swap pairs gap apart; gap = gap==1 ? 0 : (gap+1)/2.",
    ],
  },
  {
    title: "Single Number",
    topic: "Arrays",
    difficulty: "easy",
    day: 1,
    pattern: "XOR Bit Manipulation",
    description:
      "Given a non-empty array of integers nums where every element appears twice except for one, find and return that single element. Must run in O(n) time and O(1) extra space.",
    intuition:
      "XOR of a number with itself is 0, and XOR with 0 is the number itself. So XORing all elements cancels out the duplicates and leaves only the element that appears once.",
    approach:
      "Initialize result = 0. XOR every element with result. After the loop, result holds the single number because all pairs cancel (x^x=0) and 0^x=x.",
    timeComplexity: "O(n)",
    spaceComplexity: "O(1)",
    companies: ["Amazon", "Google", "Meta"],
    hints: [
      "Think about a property of XOR: what does x XOR x equal? What does x XOR 0 equal?",
      "Since all duplicates cancel, XOR-ing the whole array leaves only the unique element.",
      "result = 0. For each num: result ^= num. Return result.",
      "a^a = 0 and a^0 = a. So (a^b^a) = b. All paired numbers vanish.",
      "return reduce(nums, 0, (acc, x) => acc ^ x).",
    ],
  },
  {
    title: "Stock Buy and Sell",
    topic: "Arrays",
    difficulty: "easy",
    day: 1,
    pattern: "Greedy / Sliding Min",
    description:
      "You are given an array prices where prices[i] is the price of a stock on day i. Return the maximum profit you can achieve from one buy-sell transaction. If no profit is possible, return 0.",
    intuition:
      "To maximise profit, buy at the lowest price seen so far and sell at today's price. Track the minimum price as you scan and update max profit at each step.",
    approach:
      "Initialise minPrice = INT_MAX and maxProfit = 0. For each price: update minPrice = min(minPrice, price) then maxProfit = max(maxProfit, price - minPrice). Return maxProfit.",
    timeComplexity: "O(n)",
    spaceComplexity: "O(1)",
    companies: ["Amazon", "Google", "Microsoft", "Meta"],
    hints: [
      "You always want to buy as cheap as possible and sell as expensively as possible — but the buy must come before the sell.",
      "At each day, ask: if I sell today, what's the best I could have bought for so far?",
      "Track the running minimum price. Profit today = price[i] − minSoFar. Track max of this over all days.",
      "minPrice = ∞, maxProfit = 0. For p in prices: minPrice = min(minPrice, p); maxProfit = max(maxProfit, p−minPrice).",
      "Single pass, O(n) time O(1) space. Return maxProfit.",
    ],
  },
  {
    title: "Pow(x, n)",
    topic: "Arrays",
    difficulty: "medium",
    day: 1,
    pattern: "Fast Exponentiation / Divide & Conquer",
    description:
      "Implement pow(x, n), which calculates x raised to the power n (i.e., xⁿ). n can be negative.",
    intuition:
      "Naive multiplication is O(n). Fast power halves the problem at each step: x^n = (x^(n/2))² if n is even, and x * (x^(n/2))² if n is odd. Handle negative n by computing 1/x^(-n).",
    approach:
      "Recursive: if n==0 return 1; if n<0 return 1/pow(x,-n). half = pow(x, n/2). if n%2==0 return half*half else return x*half*half. Iteratively: result=1, base=x; while n>0: if n&1 result*=base; base*=base; n>>=1.",
    timeComplexity: "O(log n)",
    spaceComplexity: "O(log n) recursive, O(1) iterative",
    companies: ["Google", "Amazon", "Microsoft"],
    hints: [
      "Naively multiplying x by itself n times is O(n) — how can divide-and-conquer help?",
      "x^8 = (x^4)² = ((x^2)²)². You only need 3 multiplications instead of 7.",
      "If n is even: pow(x,n) = pow(x,n/2)². If n is odd: pow(x,n) = x * pow(x,n/2)². Handle negative n.",
      "Iterative bit method: while n>0, if lowest bit is set multiply result by base, always square base, right-shift n.",
      "if n<0: x=1/x, n=-n. result=1, base=x. while n: if n&1: result*=base. base*=base. n>>=1. return result.",
    ],
  },

  // ─── Day 2: Arrays Part 2 ───────────────────────────────────────────────
  {
    title: "Kadane's Algorithm (Maximum Subarray)",
    topic: "Arrays",
    difficulty: "medium",
    day: 2,
    pattern: "Dynamic Programming / Greedy",
    description:
      "Given an integer array nums, find the subarray with the largest sum and return its sum.",
    intuition:
      "At each position decide: extend the current subarray or start fresh. If adding the current element to the running sum makes it worse than starting fresh at the current element, reset. Track the maximum seen.",
    approach:
      "maxSoFar = nums[0], currentMax = nums[0]. For i from 1 to n-1: currentMax = max(nums[i], currentMax + nums[i]); maxSoFar = max(maxSoFar, currentMax). Return maxSoFar.",
    timeComplexity: "O(n)",
    spaceComplexity: "O(1)",
    companies: ["Amazon", "Microsoft", "Google", "Meta"],
    hints: [
      "At each index, decide whether to extend the previous subarray or start a new one from here.",
      "If the running sum becomes negative, it only hurts future subarrays — better to start fresh.",
      "curMax = max(arr[i], curMax + arr[i]). maxSum = max(maxSum, curMax). One pass.",
      "Handles all-negative arrays: initialise curMax and maxSum to arr[0].",
      "curMax = maxSum = arr[0]. For i=1..n-1: curMax = max(arr[i], curMax+arr[i]); maxSum = max(maxSum, curMax). return maxSum.",
    ],
  },
  {
    title: "Container With Most Water",
    topic: "Arrays",
    difficulty: "medium",
    day: 2,
    pattern: "Two Pointers",
    description:
      "Given n non-negative integers representing vertical lines at positions i, find two lines that together with the x-axis form a container that holds the most water.",
    intuition:
      "Start with the widest container (pointers at both ends). Moving the taller pointer inward can only decrease width without gaining height, so always move the shorter pointer.",
    approach:
      "left=0, right=n-1, maxWater=0. While left<right: water = min(height[left],height[right]) * (right-left); maxWater = max(maxWater, water). Move the pointer pointing to the shorter line inward. Return maxWater.",
    timeComplexity: "O(n)",
    spaceComplexity: "O(1)",
    companies: ["Amazon", "Google", "Microsoft"],
    hints: [
      "Start with the widest possible container — pointers at both ends.",
      "The water held is limited by the shorter of the two lines. To potentially increase water, move the shorter pointer.",
      "Moving the taller pointer inward can only make things worse (narrower width, height stays limited by shorter).",
      "Two pointers: left=0, right=n-1. While left<right: compute area, move shorter pointer inward.",
      "area = min(h[l],h[r])*(r-l). if h[l]<h[r]: l++ else r--.",
    ],
  },
  {
    title: "Sort Array of 0s, 1s and 2s",
    topic: "Arrays",
    difficulty: "medium",
    day: 2,
    pattern: "Dutch National Flag / Three Pointers",
    description:
      "Given an array nums with n objects colored red (0), white (1), or blue (2), sort them in-place so that objects of the same color are adjacent, in the order 0, 1, 2.",
    intuition:
      "Dutch National Flag: maintain three regions — [0..low-1] for 0s, [low..mid-1] for 1s, [high+1..n-1] for 2s — and grow them by swapping.",
    approach:
      "low=0, mid=0, high=n-1. While mid<=high: if nums[mid]==0 swap(mid,low) then low++, mid++. If nums[mid]==1 mid++. If nums[mid]==2 swap(mid,high) then high-- (don't increment mid).",
    timeComplexity: "O(n)",
    spaceComplexity: "O(1)",
    companies: ["Microsoft", "Amazon", "Google"],
    hints: [
      "Count sort works in O(n) but needs two passes. Can you do it in one?",
      "Dutch National Flag: three pointers split the array into regions for 0s, 1s, and 2s.",
      "low tracks boundary of 0-region, high tracks boundary of 2-region, mid is the pointer you walk.",
      "If arr[mid]==2, swap with arr[high] and high--; don't advance mid (new element needs checking).",
      "low=mid=0, high=n-1. while mid<=high: 0→swap(mid,low),l++,m++; 1→m++; 2→swap(mid,high),h--.",
    ],
  },
  {
    title: "3Sum",
    topic: "Arrays",
    difficulty: "medium",
    day: 2,
    pattern: "Sorting + Two Pointers",
    description:
      "Given an integer array nums, return all the triplets [nums[i], nums[j], nums[k]] such that i, j, k are distinct indices and nums[i] + nums[j] + nums[k] == 0. The solution set must not contain duplicate triplets.",
    intuition:
      "Sort the array. Fix one element and use two pointers to find the pair that sums to its negative. Skip duplicates at each step to avoid repeated triplets.",
    approach:
      "Sort nums. For i from 0 to n-3: skip if nums[i]==nums[i-1]. Set left=i+1, right=n-1. While left<right: compute sum. If zero, record and skip duplicates. If negative, left++. If positive, right--.",
    timeComplexity: "O(n²)",
    spaceComplexity: "O(1) extra (output excluded)",
    companies: ["Amazon", "Google", "Microsoft", "Meta"],
    hints: [
      "Fix one number and reduce to 2Sum on the remaining sorted subarray.",
      "Sort first — then use two pointers from both ends of the remaining subarray.",
      "To avoid duplicates: skip nums[i] if it equals nums[i-1]; after recording a triplet, skip equal nums[left] and nums[right].",
      "for i in 0..n-3: if i>0 and nums[i]==nums[i-1]: skip. l=i+1, r=n-1. while l<r: check sum.",
      "sum = nums[i]+nums[l]+nums[r]. if 0: add, skip dupes, l++, r--. if <0: l++. if >0: r--.",
    ],
  },
  {
    title: "4Sum",
    topic: "Arrays",
    difficulty: "medium",
    day: 2,
    pattern: "Sorting + Two Pointers",
    description:
      "Given an array nums of n integers and a target, return all unique quadruplets [a, b, c, d] such that a + b + c + d == target.",
    intuition:
      "Extend 3Sum by adding one more fixed outer loop. Fix two pointers with nested loops and use two-pointer search for the inner pair. Skip duplicates at each level.",
    approach:
      "Sort nums. Fix i, then j (i+1 to n-2). For each pair (i,j), use left=j+1, right=n-1 two pointers. Skip duplicates at each of the four levels.",
    timeComplexity: "O(n³)",
    spaceComplexity: "O(1) extra",
    companies: ["Amazon", "Microsoft"],
    hints: [
      "4Sum = fix one element + run 3Sum on the rest.",
      "3Sum = fix one element + run 2Sum (two pointers) on the rest. So 4Sum uses two outer loops.",
      "Sort and use two nested for-loops fixing first two numbers, then two pointers for the last two.",
      "Skip duplicates: if i>0 and nums[i]==nums[i-1]: continue. Same for j, left, right after match.",
      "for i: for j=i+1: l=j+1,r=n-1. sum=nums[i]+nums[j]+nums[l]+nums[r]. if==target record; <target l++; >target r--.",
    ],
  },
  {
    title: "Search in 2D Matrix",
    topic: "Arrays",
    difficulty: "medium",
    day: 2,
    pattern: "Binary Search",
    description:
      "Given an m×n integer matrix where each row is sorted left-to-right and the first integer of each row is greater than the last integer of the previous row, determine if a target value is in the matrix.",
    intuition:
      "The matrix can be treated as one sorted array of m*n elements. Binary search on it by mapping the middle index to (row, col) = (mid/n, mid%n).",
    approach:
      "lo=0, hi=m*n-1. While lo<=hi: mid=(lo+hi)/2. val = matrix[mid/n][mid%n]. If val==target return true. If val<target lo=mid+1. Else hi=mid-1. Return false.",
    timeComplexity: "O(log(m*n))",
    spaceComplexity: "O(1)",
    companies: ["Amazon", "Microsoft"],
    hints: [
      "The matrix rows are sorted and each row starts after the previous ends — it's one long sorted sequence.",
      "Map a 1D index k to 2D: row = k / n, col = k % n.",
      "Binary search on range [0, m*n−1] treating the matrix as a flat sorted array.",
      "lo=0, hi=m*n-1. mid=(lo+hi)/2. val=matrix[mid/cols][mid%cols].",
      "if val<target: lo=mid+1. if val>target: hi=mid-1. if equal: return true. Return false.",
    ],
  },

  // ─── Day 3: Arrays Part 3 ───────────────────────────────────────────────
  {
    title: "Next Permutation",
    topic: "Arrays",
    difficulty: "medium",
    day: 3,
    pattern: "Array Manipulation",
    description:
      "Given an array of integers nums, rearrange the numbers into the next lexicographically greater permutation. If no such permutation exists, rearrange to the lowest possible order (sorted ascending). Must be done in-place.",
    intuition:
      "Find the rightmost element that is smaller than its successor (the 'pivot'). Swap it with the smallest element to its right that is still larger than it. Then reverse the suffix to the right of the pivot position.",
    approach:
      "1. Find pivot: scan right-to-left for nums[i] < nums[i+1]. 2. Find successor: scan right-to-left for nums[j] > nums[i], swap. 3. Reverse nums[i+1..n-1]. If no pivot found, just reverse the whole array.",
    timeComplexity: "O(n)",
    spaceComplexity: "O(1)",
    companies: ["Amazon", "Microsoft", "Google"],
    hints: [
      "The suffix that is in descending order cannot be made larger — the change must happen just before it.",
      "Find the rightmost index i where nums[i] < nums[i+1]. This is the 'breakpoint'.",
      "From the right, find the smallest number greater than nums[i], swap them.",
      "After the swap, the suffix nums[i+1..] is still descending. Reverse it to get the smallest arrangement.",
      "Step 1: find i (right-to-left) where arr[i]<arr[i+1]. Step 2: find j (right-to-left) where arr[j]>arr[i], swap(i,j). Step 3: reverse arr[i+1..].",
    ],
  },
  {
    title: "Merge Overlapping Intervals",
    topic: "Arrays",
    difficulty: "medium",
    day: 3,
    pattern: "Sorting + Greedy",
    description:
      "Given an array of intervals where intervals[i] = [start, end], merge all overlapping intervals and return the non-overlapping intervals.",
    intuition:
      "Sort by start time. Then walk through: if the current interval overlaps with the last merged one (current.start <= last.end), extend the last merged interval's end. Otherwise start a new interval.",
    approach:
      "Sort intervals by start. Push first interval to result. For each remaining interval: if interval.start <= result.back.end → result.back.end = max(result.back.end, interval.end). Else push interval to result.",
    timeComplexity: "O(n log n)",
    spaceComplexity: "O(n)",
    companies: ["Amazon", "Google", "Microsoft", "Meta"],
    hints: [
      "Sort by start time — then overlapping intervals are adjacent.",
      "After sorting, two consecutive intervals overlap iff interval[i].start <= interval[i-1].end.",
      "Maintain a result list. For each interval, either merge with the last or add it fresh.",
      "Merge = extend last result's end to max(last.end, current.end).",
      "Sort. result=[intervals[0]]. For i=1..n-1: if intervals[i][0]<=result.back[1]: result.back[1]=max(result.back[1],intervals[i][1]). else: result.push(intervals[i]).",
    ],
  },
  {
    title: "Longest Substring Without Repeating Characters",
    topic: "Arrays",
    difficulty: "medium",
    day: 3,
    pattern: "Sliding Window",
    description:
      "Given a string s, find the length of the longest substring without repeating characters.",
    intuition:
      "Use a sliding window with a set/map tracking characters. Expand the right boundary; when a duplicate is found, shrink from the left until the duplicate is removed.",
    approach:
      "Map last-seen index of each char. left=0, maxLen=0. For right from 0 to n-1: if s[right] in map and map[s[right]] >= left, move left to map[s[right]]+1. Update map[s[right]]=right. maxLen = max(maxLen, right-left+1).",
    timeComplexity: "O(n)",
    spaceComplexity: "O(min(n, alphabet))",
    companies: ["Amazon", "Google", "Microsoft", "Meta"],
    hints: [
      "A sliding window with a set can check for duplicates efficiently.",
      "Expand the right end; whenever a repeat is encountered, shrink the left end.",
      "Instead of shrinking one by one, store the last index of each character and jump left past the duplicate.",
      "map stores last occurrence. When s[right] is seen and its index >= left, set left = lastIndex+1.",
      "left=0, map={}, maxLen=0. for r=0..n-1: if s[r] in map and map[s[r]]>=left: left=map[s[r]]+1. map[s[r]]=r. maxLen=max(maxLen, r-left+1).",
    ],
  },
  {
    title: "Set Matrix Zeroes",
    topic: "Arrays",
    difficulty: "medium",
    day: 3,
    pattern: "Matrix / In-place Marking",
    description:
      "Given an m×n integer matrix, if an element is 0, set its entire row and column to 0. Do it in-place.",
    intuition:
      "Use the first row and first column as markers — record which rows/columns need zeroing there, then zero out accordingly. Handle the first row/column separately.",
    approach:
      "Check if row 0 or col 0 themselves contain zeros (save to flags). Use matrix[i][0] and matrix[0][j] as markers for rows and cols. Second pass: if marker is 0, zero that row/col. Finally handle row 0 and col 0 using flags.",
    timeComplexity: "O(m*n)",
    spaceComplexity: "O(1)",
    companies: ["Amazon", "Microsoft"],
    hints: [
      "Naive: store which rows/cols have zeros — O(m+n) space. Can you avoid extra space?",
      "Use the matrix itself as the memo: first row and first column can store flags.",
      "Before marking, record whether row 0 or col 0 originally had zeros.",
      "Pass 1: for each cell (i,j) with 0: set matrix[i][0]=0 and matrix[0][j]=0. Pass 2: use those flags.",
      "flagRow0 = any(matrix[0][j]==0). flagCol0 = any(matrix[i][0]==0). Mark first row/col. Then zero rows/cols. Then fix row0/col0 using flags.",
    ],
  },
  {
    title: "Word Search",
    topic: "Arrays",
    difficulty: "medium",
    day: 3,
    pattern: "DFS / Backtracking",
    description:
      "Given an m×n grid of characters board and a string word, return true if word exists in the grid. The word can be constructed from letters of sequentially adjacent cells (horizontally or vertically). Each cell may be used only once.",
    intuition:
      "DFS from every cell that matches the first character. At each step try all four directions, mark the current cell visited (to avoid reuse), recurse for the next character, then unmark.",
    approach:
      "For each cell (i,j): if board[i][j]==word[0], call dfs(i,j,0). DFS: if k==len(word) return true. Bounds/visited/char mismatch: return false. Mark visited (e.g. #), recurse 4 directions, unmark (restore), return OR of results.",
    timeComplexity: "O(m*n*4^L) where L=word length",
    spaceComplexity: "O(L) recursion stack",
    companies: ["Amazon", "Microsoft"],
    hints: [
      "Try DFS/backtracking starting from each cell in the grid.",
      "At each step, mark the current cell as visited (e.g., overwrite with '#') to prevent revisiting.",
      "After exploring all four directions, restore the cell's original character (backtrack).",
      "Base case: if index == word.length, you've matched the entire word — return true.",
      "dfs(i,j,k): if k==len return true. if out-of-bounds or board[i][j]!=word[k] return false. tmp=board[i][j]; board[i][j]='#'. res=dfs(4 dirs, k+1). board[i][j]=tmp. return res.",
    ],
  },
  {
    title: "Product of Array Except Self",
    topic: "Arrays",
    difficulty: "medium",
    day: 3,
    pattern: "Prefix/Suffix Products",
    description:
      "Given an integer array nums, return an array answer where answer[i] is the product of all elements of nums except nums[i]. Solve it without using division in O(n).",
    intuition:
      "For each index i, the answer is (product of all elements to the left of i) × (product of all elements to the right of i). Compute left products in a forward pass and right products in a backward pass.",
    approach:
      "Pass 1 (left): result[i] = product of nums[0..i-1]. result[0]=1, result[i]=result[i-1]*nums[i-1]. Pass 2 (right): maintain a running right product R=1. For i from n-1 to 0: result[i]*=R; R*=nums[i].",
    timeComplexity: "O(n)",
    spaceComplexity: "O(1) extra (output array not counted)",
    companies: ["Amazon", "Google", "Microsoft", "Meta"],
    hints: [
      "answer[i] = (product of everything left of i) * (product of everything right of i).",
      "Compute prefix products in one pass, suffix products in a second pass.",
      "Store prefix products in the output array, then multiply in suffix products using just one variable.",
      "Left pass: out[0]=1, out[i]=out[i-1]*nums[i-1]. Right pass: R=1, out[i]*=R, R*=nums[i] (right to left).",
      "Two O(n) passes, O(1) extra space beyond the output array.",
    ],
  },

  // ─── Day 4: Arrays Part 4 ───────────────────────────────────────────────
  {
    title: "Subarray Sum Equals K",
    topic: "Arrays",
    difficulty: "medium",
    day: 4,
    pattern: "Prefix Sum + Hash Map",
    description:
      "Given an array of integers nums and an integer k, return the total number of subarrays whose sum equals k.",
    intuition:
      "Sum of subarray [i+1..j] = prefixSum[j] - prefixSum[i]. So if prefixSum[j] - k exists in a map, subarrays ending at j with sum k are found. Store frequency of prefix sums.",
    approach:
      "map={0:1}, prefixSum=0, count=0. For each num: prefixSum+=num. count += map.get(prefixSum-k, 0). map[prefixSum]++. Return count.",
    timeComplexity: "O(n)",
    spaceComplexity: "O(n)",
    companies: ["Amazon", "Google", "Microsoft"],
    hints: [
      "Prefix sum: sum(i..j) = prefixSum[j] - prefixSum[i-1]. You need this difference to equal k.",
      "For each j, you need prefixSum[j] - k to have appeared as a prefix sum before j.",
      "Store frequency of prefix sums seen so far in a hash map.",
      "Initialize map with {0: 1} (empty prefix has sum 0). For each element: prefix+=num; count+=map[prefix-k]; map[prefix]++.",
      "O(n) time, O(n) space. count captures all subarrays ending at each position.",
    ],
  },
  {
    title: "Find the Duplicate Number",
    topic: "Arrays",
    difficulty: "medium",
    day: 4,
    pattern: "Floyd's Cycle Detection",
    description:
      "Given an array of n+1 integers where each integer is in range [1, n], exactly one number is repeated. Find the duplicate without modifying the array and using O(1) extra space.",
    intuition:
      "Treat array as a linked list where value = next index. Since there's a duplicate, there must be a cycle (like linked list cycle). Apply Floyd's tortoise-and-hare algorithm.",
    approach:
      "Phase 1: slow=nums[0], fast=nums[nums[0]]. Move until slow==fast (inside cycle). Phase 2: slow=nums[0]. Move both one step at a time until they meet. Meeting point is the duplicate.",
    timeComplexity: "O(n)",
    spaceComplexity: "O(1)",
    companies: ["Amazon", "Google", "Microsoft"],
    hints: [
      "Treat nums as a function f(i) = nums[i]. Since a duplicate exists, the function maps two indices to the same value — creating a cycle.",
      "Use Floyd's cycle detection: tortoise moves one step, hare moves two steps.",
      "Phase 1: find a node inside the cycle. Phase 2: find the cycle entry (the duplicate).",
      "After phase 1, reset slow to nums[0]. Move both one step. Where they meet is the duplicate.",
      "slow=nums[0], fast=nums[nums[0]]. while slow!=fast: slow=nums[slow]; fast=nums[nums[fast]]. slow=nums[0]. while slow!=fast: slow=nums[slow]; fast=nums[fast]. return slow.",
    ],
  },
  {
    title: "Count Inversions",
    topic: "Arrays",
    difficulty: "hard",
    day: 4,
    pattern: "Merge Sort",
    description:
      "Given an array of n integers, count the number of inversions — pairs (i, j) where i < j but arr[i] > arr[j].",
    intuition:
      "Merge sort naturally counts inversions: when merging two sorted halves, whenever we take an element from the right half before elements remaining in the left half, each of those left elements forms an inversion with the right element.",
    approach:
      "Modified merge sort: during merge of left[l..m] and right[m+1..r], whenever right[j] < left[i], all elements left[i..m] form inversions with right[j] — add (m-i+1) to count. Recurse on both halves.",
    timeComplexity: "O(n log n)",
    spaceComplexity: "O(n)",
    companies: ["Amazon", "Microsoft", "Google"],
    hints: [
      "Brute force O(n²): check every pair. Can divide-and-conquer help?",
      "During merge sort's merge step, when a right-half element is placed before left-half elements, those left-half elements form inversions.",
      "count += (mid - left_pointer + 1) every time you pick from the right side.",
      "Recursively count inversions in left half, right half, and during the merge step.",
      "mergeSort(arr, l, r): if l>=r return 0. mid=(l+r)/2. cnt=mergeSort(l,mid)+mergeSort(mid+1,r)+merge(l,mid,r). During merge: if right[j]<left[i]: count+=mid-i+1.",
    ],
  },
  {
    title: "Spiral Matrix",
    topic: "Arrays",
    difficulty: "medium",
    day: 4,
    pattern: "Simulation / Layer Peeling",
    description:
      "Given an m×n matrix, return all elements in spiral order.",
    intuition:
      "Peel the matrix layer by layer. Maintain four boundaries (top, bottom, left, right) and traverse the outermost ring, then shrink the boundaries inward.",
    approach:
      "top=0, bottom=m-1, left=0, right=n-1. While top<=bottom and left<=right: traverse top row → right col → bottom row (if top<bottom) → left col (if left<right). Then top++, bottom--, left++, right--.",
    timeComplexity: "O(m*n)",
    spaceComplexity: "O(1) extra",
    companies: ["Amazon", "Microsoft", "Google"],
    hints: [
      "Maintain four boundaries: top, bottom, left, right — shrink them after each ring.",
      "Traverse: left→right along top, top→bottom along right, right→left along bottom, bottom→top along left.",
      "Check top<=bottom and left<=right before traversing each direction to avoid duplicates.",
      "After each full ring: top++, bottom--, left++, right--.",
      "while top<=bottom and left<=right: right→down→left(if rows>1)→up(if cols>1). Shrink boundaries.",
    ],
  },
  {
    title: "Search in Sorted Matrix II",
    topic: "Arrays",
    difficulty: "medium",
    day: 4,
    pattern: "Staircase Search",
    description:
      "Given an m×n matrix where each row and each column is sorted in ascending order, determine if a target value exists in the matrix.",
    intuition:
      "Start from the top-right corner. If current > target, move left (eliminate column). If current < target, move down (eliminate row). If equal, found.",
    approach:
      "row=0, col=n-1. While row<m and col>=0: if matrix[row][col]==target return true. If >target col--. Else row++. Return false.",
    timeComplexity: "O(m+n)",
    spaceComplexity: "O(1)",
    companies: ["Amazon", "Microsoft", "Google"],
    hints: [
      "This matrix is sorted per row and per column but can't be treated as a simple 1D sorted array.",
      "Start at a corner where one direction always increases and the other always decreases: top-right or bottom-left.",
      "From top-right: current > target means the entire column below is too large, move left. current < target means the entire row left is too small, move down.",
      "row=0, col=n-1. while in bounds: compare and move.",
      "if matrix[r][c]==target: true. if >target: c--. if <target: r++. Return false when out of bounds.",
    ],
  },

  // ─── Day 5: Arrays Part 5 ───────────────────────────────────────────────
  {
    title: "Trapping Rainwater",
    topic: "Arrays",
    difficulty: "hard",
    day: 5,
    pattern: "Two Pointers",
    description:
      "Given n non-negative integers representing an elevation map where the width of each bar is 1, compute how much water it can trap after raining.",
    intuition:
      "Water at position i is bounded by min(maxLeft[i], maxRight[i]) - height[i]. Two-pointer approach: maintain leftMax and rightMax; whichever side has the smaller max, the water there is determined and can be added.",
    approach:
      "left=0, right=n-1, leftMax=0, rightMax=0, water=0. While left<right: if height[left]<=height[right]: leftMax=max(leftMax,height[left]); water+=leftMax-height[left]; left++. Else same for right.",
    timeComplexity: "O(n)",
    spaceComplexity: "O(1)",
    companies: ["Amazon", "Google", "Microsoft", "Meta"],
    hints: [
      "Water at column i = min(maxHeight to its left, maxHeight to its right) − height[i].",
      "Precompute leftMax and rightMax arrays in two passes: O(n) time O(n) space.",
      "Optimize to O(1) space with two pointers: the side with the smaller max is the bottleneck.",
      "Process the side with the smaller pointer first because the other side guarantees a wall at least as high.",
      "left=0, right=n-1, lMax=rMax=water=0. while l<r: if h[l]<=h[r]: lMax=max(lMax,h[l]); water+=lMax-h[l]; l++. else: rMax=max(rMax,h[r]); water+=rMax-h[r]; r--.",
    ],
  },
  {
    title: "Sliding Window Maximum",
    topic: "Arrays",
    difficulty: "hard",
    day: 5,
    pattern: "Monotonic Deque",
    description:
      "Given an array nums and an integer k, return an array of the maximum values in each sliding window of size k.",
    intuition:
      "Use a monotonic decreasing deque of indices. The front always holds the index of the current window's maximum. Remove indices out of the window from the front; remove indices of smaller elements from the back (they can never be the max).",
    approach:
      "Deque stores indices. For i in 0..n-1: pop front if out of window. Pop back while nums[deque.back] <= nums[i]. Push i. If i>=k-1, record nums[deque.front] as result.",
    timeComplexity: "O(n)",
    spaceComplexity: "O(k)",
    companies: ["Amazon", "Google", "Microsoft"],
    hints: [
      "Brute force: O(nk). Can you find each window's max in O(1)?",
      "A deque (double-ended queue) of indices maintained in decreasing order of values gives O(1) max access.",
      "Remove from the front indices that have left the window (index <= i-k).",
      "Remove from the back any index whose value <= nums[i] — it can never be a future maximum.",
      "deque of indices. for i=0..n-1: while deque not empty and deque.front<=i-k: pop front. while deque not empty and nums[deque.back]<=nums[i]: pop back. push i. if i>=k-1: output nums[deque.front].",
    ],
  },
  {
    title: "Largest Rectangle in a Histogram",
    topic: "Arrays",
    difficulty: "hard",
    day: 5,
    pattern: "Monotonic Stack",
    description:
      "Given an array of integers heights representing the histogram's bar heights, find the area of the largest rectangle that can be formed in the histogram.",
    intuition:
      "For each bar, the largest rectangle with that bar as the shortest side extends left and right until it hits a shorter bar. Use a monotonic increasing stack to efficiently find these left and right boundaries.",
    approach:
      "Maintain a stack of indices with increasing heights. When heights[i] < heights[top], pop and compute area: width = i - stack.top - 1 (or i if stack empty). Push i. After array, pop remaining elements.",
    timeComplexity: "O(n)",
    spaceComplexity: "O(n)",
    companies: ["Amazon", "Google", "Microsoft"],
    hints: [
      "For each bar as the minimum, how far left and right can the rectangle extend?",
      "The rectangle extends until it hits a shorter bar. You need 'previous smaller' and 'next smaller' for each bar.",
      "Monotonic stack: maintain increasing-height indices. When a shorter bar is encountered, pop and compute.",
      "When popping index `top`: width = i - stack.peek() - 1 (or i if stack empty). area = heights[top] * width.",
      "Stack, append -1 sentinel. for i=0..n: while stack.top!=-1 and (i==n or h[i]<h[stack.top]): h=pop; w=i-stack.top-1; maxArea=max(maxArea,h*w). push i.",
    ],
  },
  {
    title: "Reverse Pairs",
    topic: "Arrays",
    difficulty: "hard",
    day: 5,
    pattern: "Merge Sort",
    description:
      "Given an integer array nums, return the number of reverse pairs. A reverse pair is a pair (i, j) where 0 <= i < j < n and nums[i] > 2 * nums[j].",
    intuition:
      "Like count inversions, use merge sort. But the condition is nums[i] > 2*nums[j] (not just nums[i] > nums[j]), so count the pairs separately before merging, then do the standard merge.",
    approach:
      "During merge: before merging left and right halves, count pairs. For each i in left half, advance j in right half while nums[i] > 2*nums[j]. Count all valid pairs. Then do standard merge.",
    timeComplexity: "O(n log n)",
    spaceComplexity: "O(n)",
    companies: ["Amazon"],
    hints: [
      "Brute force is O(n²). Think divide-and-conquer — count pairs across halves during merge sort.",
      "During merge, for each element in the left half, count elements in the right half satisfying nums[left] > 2*nums[right].",
      "Because both halves are sorted, the counting can be done with two pointers in O(n).",
      "Count pairs first (using two pointers across halves), then perform the standard merge.",
      "mergeSort(l,r): count=mergeSort(l,mid)+mergeSort(mid+1,r). j=mid+1. for i=l..mid: while j<=r and arr[i]>2*arr[j]: j++. count+=j-(mid+1). then merge. return count.",
    ],
  },

  // ─── Day 6: Strings Part 1 ───────────────────────────────────────────────
  {
    title: "Valid Palindrome",
    topic: "Strings",
    difficulty: "easy",
    day: 6,
    pattern: "Two Pointers",
    description:
      "A phrase is a palindrome if, after converting all uppercase letters to lowercase letters and removing all non-alphanumeric characters, it reads the same forward and backward. Given a string s, return true if it is a palindrome.",
    intuition:
      "Two pointers from both ends, skip non-alphanumeric characters, compare lowercased characters.",
    approach:
      "left=0, right=n-1. While left<right: skip non-alnum from both sides. If tolower(s[left]) != tolower(s[right]) return false. left++, right--. Return true.",
    timeComplexity: "O(n)",
    spaceComplexity: "O(1)",
    companies: ["Amazon", "Microsoft"],
    hints: [
      "Filter out non-alphanumeric, convert to lowercase, then check if equal to its reverse.",
      "Or use two pointers — skip non-alphanumeric chars and compare.",
      "left=0, right=n-1. While left<right: skip non-alnum. Compare lowercased chars. Move pointers.",
      "isalnum() to check, tolower() to normalise.",
      "while left<right: while left<right and !isalnum(s[left]): left++. while left<right and !isalnum(s[right]): right--. if tolower(s[left])!=tolower(s[right]): return false. left++; right--. return true.",
    ],
  },
  {
    title: "Valid Anagram",
    topic: "Strings",
    difficulty: "easy",
    day: 6,
    pattern: "Frequency Count",
    description:
      "Given two strings s and t, return true if t is an anagram of s, and false otherwise.",
    intuition:
      "Two strings are anagrams iff they have the same character frequencies. Count frequency of each character in s, subtract for t, check all zero.",
    approach:
      "If len(s) != len(t) return false. freq[26] = {0}. For c in s: freq[c-'a']++. For c in t: freq[c-'a']--. If any freq[i]!=0 return false, else true.",
    timeComplexity: "O(n)",
    spaceComplexity: "O(1) — fixed 26-char array",
    companies: ["Amazon", "Google"],
    hints: [
      "If they're the same length and have the same character counts, they're anagrams.",
      "Sort both strings and compare — O(n log n). Can you do O(n)?",
      "Frequency array: count chars in s, decrement for t, check all zero.",
      "int freq[26]={0}. for c in s: freq[c-'a']++. for c in t: freq[c-'a']--. return all zero.",
      "Edge: if len(s)!=len(t) return false immediately.",
    ],
  },
  {
    title: "Reverse Words in a String",
    topic: "Strings",
    difficulty: "medium",
    day: 6,
    pattern: "String Manipulation",
    description:
      "Given an input string s, reverse the order of the words. A word is defined as a sequence of non-space characters. The result should not contain leading/trailing spaces, and words should be separated by a single space.",
    intuition:
      "Split the string into words, reverse the list, join with spaces. Or do it in-place: reverse the whole string, then reverse each word.",
    approach:
      "Split by spaces (handling multiple spaces), filter empty strings, reverse the list, join with single space. In-place: reverse entire string, then for each word in the reversed string, reverse the word characters.",
    timeComplexity: "O(n)",
    spaceComplexity: "O(n)",
    companies: ["Amazon", "Microsoft"],
    hints: [
      "Split the string on whitespace, trim, reverse the list, join.",
      "Python: ' '.join(reversed(s.split())). Java: use split('\\s+'), reverse, join.",
      "In-place: reverse entire string, then reverse each word individually.",
      "After reversing the full string, each word's characters are reversed — reverse each word to fix.",
      "s.strip().split() handles multiple spaces. Reverse the resulting list. Join with single space.",
    ],
  },
  {
    title: "Remove All Occurrences of a Substring",
    topic: "Strings",
    difficulty: "medium",
    day: 6,
    pattern: "String / Stack",
    description:
      "Given two strings s and part, repeatedly remove the leftmost occurrence of part from s until it is no longer present. Return the resulting string.",
    intuition:
      "Use a stack character by character. Append each character; after appending, check if the end of the stack matches `part`. If so, remove those characters.",
    approach:
      "Build result character by character into a list/stack. After each push, check if the last len(part) characters equal part. If yes, pop len(part) characters. Return the remaining stack as string.",
    timeComplexity: "O(n * |part|)",
    spaceComplexity: "O(n)",
    companies: ["Amazon"],
    hints: [
      "Repeatedly find and remove can be simulated with a stack built character by character.",
      "After pushing each character, check if the stack's tail matches `part`.",
      "If the last `part.length` characters of the stack == part, pop them all.",
      "stack = []. for c in s: stack.append(c). if ''.join(stack[-len(part):]) == part: del stack[-len(part):].",
      "return ''.join(stack). Each character is pushed and popped at most once — O(n * |part|).",
    ],
  },
  {
    title: "Permutation in String",
    topic: "Strings",
    difficulty: "medium",
    day: 6,
    pattern: "Sliding Window + Frequency",
    description:
      "Given two strings s1 and s2, return true if s2 contains a permutation of s1. In other words, return true if one of s1's permutations is a substring of s2.",
    intuition:
      "A permutation of s1 has the same character frequencies as s1. Slide a window of size len(s1) over s2 and check if frequencies match.",
    approach:
      "Build freq count for s1. Slide window of len(s1) over s2 maintaining a window frequency map. Add new char, remove old char. Compare maps (or track a `matches` counter). Return true if match found.",
    timeComplexity: "O(n)",
    spaceComplexity: "O(1) — 26 chars",
    companies: ["Amazon", "Google"],
    hints: [
      "Any permutation of s1 has the same character frequency as s1.",
      "Slide a window of size len(s1) across s2 and compare frequency maps.",
      "Track a `matches` counter instead of comparing entire maps each step — update it incrementally.",
      "When the window slides: add s2[right], update matches; remove s2[left], update matches; left++.",
      "matches = number of chars where window freq == s1 freq. When matches == 26, return true.",
    ],
  },
  {
    title: "String Compression",
    topic: "Strings",
    difficulty: "medium",
    day: 6,
    pattern: "Two Pointers / In-place",
    description:
      "Given an array of characters chars, compress it using the following algorithm: groups of consecutive repeating characters are replaced by the character followed by its count (if count > 1). Modify chars in-place and return the new length.",
    intuition:
      "Use a read pointer and a write pointer. Count consecutive characters, write the character then the count digits at the write position.",
    approach:
      "read=0, write=0. While read<n: char=chars[read], count how many consecutive. chars[write++]=char. If count>1 write each digit of count string to chars[write++]. Move read past all of this char.",
    timeComplexity: "O(n)",
    spaceComplexity: "O(1)",
    companies: ["Amazon", "Microsoft"],
    hints: [
      "Two pointer: read pointer counts consecutive chars, write pointer builds the compressed string in-place.",
      "Count how many consecutive chars[read] there are; write char + count digits.",
      "Count digits: convert count to string and write each digit separately.",
      "Move read past all instances of the current character.",
      "read=write=0. while read<n: c=chars[read]; count=0. while read<n and chars[read]==c: read++; count++. chars[write++]=c. if count>1: for d in str(count): chars[write++]=d. return write.",
    ],
  },

  // ─── Day 7: Strings Part 2 ───────────────────────────────────────────────
  {
    title: "Longest Common Prefix",
    topic: "Strings",
    difficulty: "easy",
    day: 7,
    pattern: "String Comparison",
    description:
      "Write a function to find the longest common prefix string amongst an array of strings. If there is no common prefix, return an empty string.",
    intuition:
      "Take the first string as the current prefix and progressively shorten it to match every other string. If at any point the prefix becomes empty, return early.",
    approach:
      "prefix = strs[0]. For each str in strs[1..]: while str.startswith(prefix) is false, remove last char of prefix. If prefix becomes empty, return ''. Return prefix.",
    timeComplexity: "O(S) where S = total chars in all strings",
    spaceComplexity: "O(1)",
    companies: ["Amazon", "Microsoft", "Google"],
    hints: [
      "Compare strings character by character from the start.",
      "Use the first string as the candidate prefix, shrink it as you check each other string.",
      "Or sort lexicographically — the LCP is between the first and last strings after sorting.",
      "while str.find(prefix) != 0: prefix = prefix[:-1]. If empty, return ''.",
      "prefix = strs[0]. for s in strs[1:]: while s[:len(prefix)] != prefix: prefix=prefix[:-1]. return prefix.",
    ],
  },
  {
    title: "Group Anagrams",
    topic: "Strings",
    difficulty: "medium",
    day: 7,
    pattern: "Hash Map / Sorting",
    description:
      "Given an array of strings strs, group the anagrams together. You can return the answer in any order.",
    intuition:
      "Anagrams have the same sorted form. Use the sorted word as the key in a hash map and group all anagrams under the same key.",
    approach:
      "map = {}. For each word in strs: key = ''.join(sorted(word)). map[key].append(word). Return list(map.values()).",
    timeComplexity: "O(n * k log k) where k = max word length",
    spaceComplexity: "O(n * k)",
    companies: ["Amazon", "Google", "Microsoft"],
    hints: [
      "Two strings are anagrams iff their sorted forms are equal.",
      "Use sorted(word) as a hash key, group all words with the same key.",
      "Alternatively, use a frequency tuple (count of each letter a-z) as the key.",
      "defaultdict(list). for word in strs: map[tuple(sorted(word))].append(word).",
      "return list(map.values()).",
    ],
  },
  {
    title: "Minimum Window Substring",
    topic: "Strings",
    difficulty: "hard",
    day: 7,
    pattern: "Sliding Window",
    description:
      "Given two strings s and t, return the minimum window substring of s such that every character in t (including duplicates) is included in the window. Return empty string if none exists.",
    intuition:
      "Expand the right pointer until the window contains all characters of t. Then contract from the left while the window is still valid. Track the minimum valid window.",
    approach:
      "need = freq(t). have=0, required=len(need). left=0, minLen=INF, result=''. For right in 0..n-1: add s[right] to window. When window[c] == need[c] increment have. While have==required: update result if smaller. Remove s[left], adjust have, left++.",
    timeComplexity: "O(|s| + |t|)",
    spaceComplexity: "O(|s| + |t|)",
    companies: ["Amazon", "Google", "Microsoft", "Meta"],
    hints: [
      "Classic sliding window: expand right until valid, contract left while still valid.",
      "Track how many distinct characters have their required frequency satisfied (the `have` counter).",
      "Only decrement `have` when removing the left character drops its count below required.",
      "Track the best window's start and length separately, reconstruct the substring at the end.",
      "need=Counter(t). have=0, required=len(need). window={}. left=0, res=(-1,0,n). for r,c in enumerate(s): window[c]+=1. if c in need and window[c]==need[c]: have+=1. while have==required: update res. remove s[left] from window; adjust have; left++.",
    ],
  },
  {
    title: "KMP Algorithm",
    topic: "Strings",
    difficulty: "hard",
    day: 7,
    pattern: "KMP / Failure Function",
    description:
      "Implement the Knuth-Morris-Pratt string matching algorithm. Given a text and a pattern, find all starting indices where the pattern occurs in the text.",
    intuition:
      "Precompute a failure (LPS — Longest Proper Prefix that is also Suffix) array for the pattern. Use it to avoid re-examining text characters when a mismatch occurs — jump to the next valid match position.",
    approach:
      "1. Build LPS array: lps[i] = length of longest proper prefix of pattern[0..i] that is also a suffix. 2. Match: i=text pointer, j=pattern pointer. If match advance both. Mismatch: if j>0 set j=lps[j-1] else i++.",
    timeComplexity: "O(n + m) where n=|text|, m=|pattern|",
    spaceComplexity: "O(m)",
    companies: ["Google", "Microsoft"],
    hints: [
      "Naive matching is O(nm). KMP avoids restarting from scratch on mismatch.",
      "The LPS (failure) array tells you the longest border of each prefix — how far back to jump on mismatch.",
      "Build LPS: len=0, i=1. If pat[i]==pat[len]: lps[i++]=++len. Else if len>0: len=lps[len-1]. Else lps[i++]=0.",
      "Match: i=j=0. If text[i]==pat[j]: i++, j++. If j==m: found at i-j; j=lps[j-1]. Elif mismatch: j>0→j=lps[j-1]; else i++.",
      "O(n+m) total. Each character is processed at most twice (advance i, and at most once backtrack via lps).",
    ],
  },
  {
    title: "Rabin-Karp Algorithm",
    topic: "Strings",
    difficulty: "hard",
    day: 7,
    pattern: "Rolling Hash",
    description:
      "Implement the Rabin-Karp string search algorithm using rolling hash to find occurrences of a pattern in a text.",
    intuition:
      "Compute the hash of the pattern and a rolling hash of each text window of the same size. If hashes match, verify character by character (to handle collisions). Rolling hash allows O(1) window slide.",
    approach:
      "Compute patHash and textHash for first window. For each window: if hashes match, verify. Roll hash: remove old char's contribution (multiply out), add new char. Use modular arithmetic to avoid overflow.",
    timeComplexity: "O(n + m) average, O(nm) worst",
    spaceComplexity: "O(1)",
    companies: ["Google"],
    hints: [
      "Hashing a window in O(m) and sliding is O(n) naively. Rolling hash makes the slide O(1).",
      "Rolling hash: hash(window[i+1..i+m]) = (hash(window[i..i+m-1]) - val(text[i]) * h^(m-1)) * base + val(text[i+m]).",
      "Use a large prime modulus to reduce collision probability.",
      "When hashes match, always do a character-by-character check to confirm.",
      "base=31 or 256, mod=1e9+7. Precompute h=base^(m-1)%mod. Roll: hash=(hash-text[i]*h)*base+text[i+m], all mod p.",
    ],
  },
  {
    title: "Reverse Words in a String II",
    topic: "Strings",
    difficulty: "medium",
    day: 7,
    pattern: "Two Pointer / In-place",
    description:
      "Given a character array s, reverse the order of the words in-place. A word is a sequence of non-space characters.",
    intuition:
      "Reverse the entire array, then reverse each individual word. This two-step reversal restores words but flips their order.",
    approach:
      "1. Reverse entire array. 2. Find each word (between spaces), reverse it in-place.",
    timeComplexity: "O(n)",
    spaceComplexity: "O(1)",
    companies: ["Microsoft"],
    hints: [
      "Reverse the whole array — words are now in the right order but each word's characters are reversed.",
      "Reverse each word individually to restore character order.",
      "Two passes: reverse(s, 0, n-1), then for each word boundary reverse that segment.",
      "Find word boundaries by scanning for spaces.",
      "Step 1: reverse all. Step 2: i=0; while i<n: j=i; while j<n and s[j]!=' ': j++. reverse(s,i,j-1). i=j+1.",
    ],
  },

  // ─── Day 8: Binary Search ────────────────────────────────────────────────
  {
    title: "Peak Index in Mountain Array",
    topic: "Binary Search",
    difficulty: "medium",
    day: 8,
    pattern: "Binary Search",
    description:
      "Given a mountain array arr (increases then decreases), find and return the index of the peak element (strictly greater than its neighbors).",
    intuition:
      "Binary search: if arr[mid] > arr[mid+1] we're on the descending side, peak is to the left. Otherwise we're on the ascending side, peak is to the right.",
    approach:
      "lo=0, hi=n-1. While lo<hi: mid=(lo+hi)/2. If arr[mid]<arr[mid+1] lo=mid+1. Else hi=mid. Return lo.",
    timeComplexity: "O(log n)",
    spaceComplexity: "O(1)",
    companies: ["Amazon"],
    hints: [
      "Could scan linearly O(n), but binary search can do O(log n).",
      "At mid: if arr[mid] < arr[mid+1], the peak is in the right half. Otherwise it's in the left half or at mid.",
      "lo=0, hi=n-1. while lo<hi: mid=(lo+hi)/2. if arr[mid]<arr[mid+1]: lo=mid+1. else: hi=mid.",
      "When lo==hi, that's the peak index.",
      "return lo after the loop.",
    ],
  },
  {
    title: "Search in Rotated Sorted Array",
    topic: "Binary Search",
    difficulty: "medium",
    day: 8,
    pattern: "Binary Search",
    description:
      "Given a rotated sorted array (rotated at an unknown pivot) and a target, return the index of target or -1 if not found.",
    intuition:
      "One half of the array is always sorted when you split at mid. Determine which half is sorted, check if target lies in that half, and binary search accordingly.",
    approach:
      "lo=0, hi=n-1. While lo<=hi: mid=(lo+hi)/2. If nums[mid]==target return mid. If left half sorted (nums[lo]<=nums[mid]): if target in [nums[lo],nums[mid]) then hi=mid-1 else lo=mid+1. Else (right sorted): if target in (nums[mid],nums[hi]] then lo=mid+1 else hi=mid-1.",
    timeComplexity: "O(log n)",
    spaceComplexity: "O(1)",
    companies: ["Amazon", "Google", "Microsoft"],
    hints: [
      "The array has at most one rotation point. At any mid, at least one half is sorted.",
      "Check if nums[lo] <= nums[mid] — if yes, left half is sorted.",
      "If target lies within the sorted half, search there; otherwise search the other half.",
      "Be careful with equal cases to avoid infinite loops (use strict comparisons).",
      "if nums[lo]<=nums[mid]: if nums[lo]<=target<nums[mid]: hi=mid-1. else: lo=mid+1. else: if nums[mid]<target<=nums[hi]: lo=mid+1. else: hi=mid-1.",
    ],
  },
  {
    title: "Single Element in Sorted Array",
    topic: "Binary Search",
    difficulty: "medium",
    day: 8,
    pattern: "Binary Search",
    description:
      "You are given a sorted array in which all elements appear exactly twice, except for one which appears once. Find the single element in O(log n) time and O(1) space.",
    intuition:
      "Before the single element, pairs start at even indices. After it, pairs start at odd indices. Binary search on this property.",
    approach:
      "lo=0, hi=n-1 (keep hi on even index). While lo<hi: mid=(lo+hi)/2 make even. If nums[mid]==nums[mid+1]: single is to the right, lo=mid+2. Else single is to the left or mid, hi=mid. Return nums[lo].",
    timeComplexity: "O(log n)",
    spaceComplexity: "O(1)",
    companies: ["Amazon"],
    hints: [
      "XOR all elements: pairs cancel, leaves the single — O(n). Can you do O(log n)?",
      "Before the single element: pairs occupy indices (0,1),(2,3)... After: pairs shift to (1,2),(3,4)...",
      "At an even mid: if nums[mid]==nums[mid+1], single is after mid+1. Otherwise single is at or before mid.",
      "Always check even-indexed mid to maintain the pair-checking invariant.",
      "mid = mid%2==1 ? mid-1 : mid. if nums[mid]==nums[mid+1]: lo=mid+2. else: hi=mid. return nums[lo].",
    ],
  },
  {
    title: "Aggressive Cows",
    topic: "Binary Search",
    difficulty: "medium",
    day: 8,
    pattern: "Binary Search on Answer",
    description:
      "Given n stalls at positions and c cows, place the cows to maximize the minimum distance between any two cows. Return the largest minimum distance.",
    intuition:
      "Binary search on the answer (minimum distance). For a given distance d, check if it's possible to place all cows with at least d apart. If possible, try larger; otherwise try smaller.",
    approach:
      "Sort stalls. Binary search lo=1, hi=max-min. Mid=guess distance. Feasibility: greedily place cows — place next cow at next stall >= last_placed + mid. If all cows placed, feasible. lo=mid+1 if feasible, else hi=mid-1.",
    timeComplexity: "O(n log(max_dist))",
    spaceComplexity: "O(1)",
    companies: ["Amazon"],
    hints: [
      "Binary search on the answer: the minimum distance can range from 1 to (max_stall - min_stall).",
      "For a given minimum distance d, greedily check if all c cows can be placed.",
      "Greedy check: place first cow at stalls[0], then each next cow at the first stall >= last_pos + d.",
      "If count of placed cows >= c, the distance d is feasible.",
      "sort(stalls). lo=1, hi=stalls[n-1]-stalls[0]. Binary search: canPlace(mid) = greedy count >= c.",
    ],
  },
  {
    title: "Allocate Minimum Pages",
    topic: "Binary Search",
    difficulty: "medium",
    day: 8,
    pattern: "Binary Search on Answer",
    description:
      "Given an array of book pages and m students, allocate books to students such that each student gets at least one contiguous sequence and the maximum pages assigned to any student is minimised. Return that minimum possible maximum.",
    intuition:
      "Binary search on the answer (the maximum pages). For a given limit, check if books can be allocated to m students with no student exceeding the limit. Greedy check allocates as many books as possible per student.",
    approach:
      "lo=max(pages), hi=sum(pages). Binary search: canAllocate(mid) = count students needed greedily. If count<=m feasible → hi=mid. Else lo=mid+1.",
    timeComplexity: "O(n log(sum))",
    spaceComplexity: "O(1)",
    companies: ["Amazon", "Microsoft"],
    hints: [
      "Answer lies in [max(pages), sum(pages)]. Binary search on this range.",
      "Feasibility check: greedily assign books to students — when adding a book exceeds the limit, start a new student.",
      "Count students needed for a given limit. If <= m, limit is feasible.",
      "canAllocate(limit): students=1, cur=0. for p in pages: if cur+p>limit: students++; cur=0. cur+=p. return students<=m.",
      "lo=max, hi=sum. while lo<=hi: mid=(lo+hi)/2. if canAllocate(mid): ans=mid; hi=mid-1. else: lo=mid+1.",
    ],
  },
  {
    title: "Painter's Partition",
    topic: "Binary Search",
    difficulty: "medium",
    day: 8,
    pattern: "Binary Search on Answer",
    description:
      "Given n boards and k painters, assign contiguous boards to painters to minimise the maximum time taken. Each painter takes 1 unit of time per unit of board length.",
    intuition:
      "Identical to Allocate Minimum Pages — binary search on the maximum workload per painter, feasibility check greedy.",
    approach:
      "lo=max(boards), hi=sum(boards). Binary search on limit. canPaint(limit): count painters greedily, return count<=k.",
    timeComplexity: "O(n log(sum))",
    spaceComplexity: "O(1)",
    companies: ["Amazon"],
    hints: [
      "Binary search on the answer: the maximum work any painter does ranges from max(boards) to sum(boards).",
      "Feasibility: greedily assign boards to painters, start new painter when limit exceeded.",
      "Identical approach to Allocate Minimum Pages.",
      "canPaint(limit): painters=1, cur=0. for b: if cur+b>limit: painters++; cur=0. cur+=b. return painters<=k.",
      "lo=max(boards), hi=sum. Binary search for minimum feasible limit.",
    ],
  },
  {
    title: "Median of Two Sorted Arrays",
    topic: "Binary Search",
    difficulty: "hard",
    day: 8,
    pattern: "Binary Search on Partition",
    description:
      "Given two sorted arrays nums1 and nums2 of sizes m and n, return the median of the two sorted arrays. The overall run time complexity should be O(log(m+n)).",
    intuition:
      "Partition the smaller array at position i such that the partition of the combined array is exactly at the median. Binary search for the correct partition where max(leftPart) <= min(rightPart).",
    approach:
      "Binary search on the smaller array. For partition i in nums1 and j=(m+n+1)/2-i in nums2: check maxLeft1<=minRight2 and maxLeft2<=minRight1. If valid, compute median. If maxLeft1>minRight2: hi=i-1. Else lo=i+1.",
    timeComplexity: "O(log(min(m, n)))",
    spaceComplexity: "O(1)",
    companies: ["Amazon", "Google", "Microsoft", "Meta"],
    hints: [
      "Merge and find median is O(m+n). Binary search can do O(log(min(m,n))).",
      "Imagine partitioning both arrays such that left halves combined and right halves combined — find the partition where all lefts <= all rights.",
      "Binary search on partition of the smaller array. The partition of the second is determined: j = (m+n+1)/2 - i.",
      "Valid partition: maxLeft1<=minRight2 AND maxLeft2<=minRight1. Compute median from the boundary elements.",
      "If odd total: median = max(maxLeft1, maxLeft2). If even: (max(leftParts) + min(rightParts)) / 2.",
    ],
  },

  // ─── Day 9: Recursion & Backtracking Part 1 ──────────────────────────────
  {
    title: "Combination Sum I",
    topic: "Recursion & Backtracking",
    difficulty: "medium",
    day: 9,
    pattern: "Backtracking",
    description:
      "Given an array of distinct integers candidates and a target, return all unique combinations where the chosen numbers sum to target. The same number may be chosen an unlimited number of times.",
    intuition:
      "Backtrack: at each step either include the current candidate (stay on it, allow reuse) or skip to the next. Stop when target is reached or exceeded.",
    approach:
      "Sort candidates. dfs(start, remaining, current). For i from start: if candidates[i]>remaining break. Add candidates[i], recurse dfs(i, remaining-candidates[i], ...). Backtrack (remove).",
    timeComplexity: "O(N^(T/M)) where T=target, M=min candidate",
    spaceComplexity: "O(T/M) recursion depth",
    companies: ["Amazon", "Google"],
    hints: [
      "Think of it as: for each candidate, decide whether to include it (and possibly include it again) or skip to the next.",
      "Sorting and pruning (break when candidate > remaining) cuts search early.",
      "dfs(start, target): for i from start: if c[i]>target: break. path.append(c[i]). dfs(i, target-c[i]). path.pop().",
      "When target==0, record the current path.",
      "Start dfs from the same index i (not i+1) to allow reuse of the same element.",
    ],
  },
  {
    title: "Combination Sum II",
    topic: "Recursion & Backtracking",
    difficulty: "medium",
    day: 9,
    pattern: "Backtracking",
    description:
      "Given a collection of candidate numbers (may have duplicates) and a target, find all unique combinations that sum to target. Each number may only be used once.",
    intuition:
      "Sort to group duplicates. Backtrack similarly to Combination Sum I but advance to i+1 and skip duplicate candidates at the same recursion level.",
    approach:
      "Sort. dfs(start, remaining). For i from start: if i>start and candidates[i]==candidates[i-1] skip (dedup). If candidates[i]>remaining break. Include candidates[i], dfs(i+1, remaining-candidates[i]). Backtrack.",
    timeComplexity: "O(2^n)",
    spaceComplexity: "O(n)",
    companies: ["Amazon"],
    hints: [
      "Sort the input to bring duplicates together — then skip duplicates at the same recursion level.",
      "Skip duplicates: if i > start and candidates[i] == candidates[i-1]: continue.",
      "Move to i+1 (not i) since each number can only be used once.",
      "Sort, then dfs with skip logic for i>start and candidates[i]==candidates[i-1].",
      "Same template as CombSum I but: use i+1 in recursive call, and add dedup check.",
    ],
  },
  {
    title: "Palindrome Partitioning",
    topic: "Recursion & Backtracking",
    difficulty: "medium",
    day: 9,
    pattern: "Backtracking + DP",
    description:
      "Given a string s, partition it such that every substring of the partition is a palindrome. Return all possible palindrome partitioning.",
    intuition:
      "Backtrack: try every prefix of the remaining string. If it's a palindrome, include it and recurse on the suffix. Use DP to precompute isPalin[i][j].",
    approach:
      "Precompute isPalin[i][j] with DP. dfs(start): if start==n, record path. For end from start to n-1: if isPalin[start][end]: path.push(s[start..end]), dfs(end+1), path.pop.",
    timeComplexity: "O(n * 2^n)",
    spaceComplexity: "O(n²) for DP table",
    companies: ["Google", "Amazon"],
    hints: [
      "Try all possible splits: for each starting position, try every prefix and check if it's a palindrome.",
      "Precompute a 2D isPalin table to check palindrome in O(1).",
      "dfs from current position: try all substrings s[start..end]; if palindrome, include and recurse.",
      "isPalin[i][j] = (s[i]==s[j]) and (isPalin[i+1][j-1] or j-i<=2).",
      "Base case: start==s.length() → add copy of path to result.",
    ],
  },
  {
    title: "N Queens",
    topic: "Recursion & Backtracking",
    difficulty: "hard",
    day: 9,
    pattern: "Backtracking",
    description:
      "Place n queens on an n×n chessboard so that no two queens attack each other. Return all distinct solutions.",
    intuition:
      "Place one queen per row using backtracking. Use three boolean arrays to track which columns, diagonals, and anti-diagonals are under attack.",
    approach:
      "dfs(row): if row==n record solution. For each col: if col/diag/anti-diag not attacked: place queen, mark col=row-col=row+col as used, dfs(row+1), unmark.",
    timeComplexity: "O(n!)",
    spaceComplexity: "O(n)",
    companies: ["Amazon", "Google"],
    hints: [
      "Place queens row by row — for each row pick a valid column.",
      "A queen at (r,c) controls column c, diagonal r-c, and anti-diagonal r+c.",
      "Use three sets (or boolean arrays) for columns, diagonals, anti-diagonals under attack.",
      "dfs(row): for col in 0..n-1: if not attacked: place, mark, dfs(row+1), unmark.",
      "When row==n, convert the board state to a list of strings and record.",
    ],
  },
  {
    title: "Sudoku Solver",
    topic: "Recursion & Backtracking",
    difficulty: "hard",
    day: 9,
    pattern: "Backtracking",
    description:
      "Write a program to solve a Sudoku puzzle by filling the empty cells. Each digit 1-9 must appear exactly once in each row, column, and 3×3 box.",
    intuition:
      "Try digits 1-9 at each empty cell. If valid (not in same row/col/box), recurse. If a later cell has no valid digit, backtrack.",
    approach:
      "Find next empty cell. Try digits 1-9: if valid, place digit, recurse, if recursion succeeds return true, else remove (backtrack). If no digit works, return false.",
    timeComplexity: "O(9^(n²)) worst case (very fast with pruning)",
    spaceComplexity: "O(n²)",
    companies: ["Amazon", "Google"],
    hints: [
      "Try each digit 1-9 at the first empty cell; if it leads to a solution, keep it, else remove it.",
      "Validity check: digit not in current row, column, or 3×3 box.",
      "Row/col/box sets for O(1) validity checking.",
      "Base case: no empty cells remain → puzzle solved, return true.",
      "solve(): find empty (r,c). for d in 1-9: if valid: board[r][c]=d. if solve(): return true. board[r][c]='.'. return false.",
    ],
  },
  {
    title: "M-Coloring Problem",
    topic: "Recursion & Backtracking",
    difficulty: "medium",
    day: 9,
    pattern: "Backtracking",
    description:
      "Given a graph with n vertices and a number m, determine if the graph can be colored using at most m colors such that no two adjacent vertices have the same color.",
    intuition:
      "Assign colors vertex by vertex. For each vertex try each of m colors; if no adjacent vertex has that color, assign it and recurse. Backtrack if no valid color exists.",
    approach:
      "colorGraph(vertex): if vertex==n return true. For color in 1..m: if isSafe(vertex, color): assign, recurse, if true return true, unassign. Return false.",
    timeComplexity: "O(m^n)",
    spaceComplexity: "O(n)",
    companies: ["Amazon"],
    hints: [
      "Assign colors one vertex at a time. For each vertex, try all m colors.",
      "isSafe(v, c): check no neighbor of v has color c.",
      "If a color is safe, assign and recurse. If no color works, backtrack.",
      "Base case: vertex==n means all vertices colored successfully.",
      "colorGraph(v,m): if v==n: return true. for c in 1..m: if isSafe(v,c): color[v]=c. if colorGraph(v+1,m): return true. color[v]=0. return false.",
    ],
  },

  // ─── Day 10: Recursion & Backtracking Part 2 ─────────────────────────────
  {
    title: "Knight's Tour",
    topic: "Recursion & Backtracking",
    difficulty: "medium",
    day: 10,
    pattern: "Backtracking / Warnsdorff's Heuristic",
    description:
      "Given an n×n chessboard, find a sequence of moves for a knight such that it visits every cell exactly once. Return the board with the move numbers filled in.",
    intuition:
      "Backtrack: try all 8 possible knight moves from the current position. Warnsdorff's heuristic (pick the move with fewest onward moves next) dramatically speeds it up.",
    approach:
      "Place knight at (0,0), mark with move 1. dfs(x,y,moveNum): if moveNum==n*n+1 return true. Try all 8 moves; if valid and unvisited: mark, recurse, if true return true, unmark. Return false.",
    timeComplexity: "O(8^(n²)) naive; near O(n²) with Warnsdorff",
    spaceComplexity: "O(n²)",
    companies: [],
    hints: [
      "8 possible knight moves: (±1,±2) and (±2,±1).",
      "Mark each visited cell with the move number. Backtrack if stuck.",
      "Warnsdorff's heuristic: at each step, choose the move that leads to the fewest further moves (reduces backtracking dramatically).",
      "Board of -1s initially. place knight at start, recurse for move 2..n².",
      "dfs(x,y,move): if move==n*n+1: return true. for each dx,dy: nx,ny=x+dx,y+dy. if valid and board[nx][ny]==-1: board[nx][ny]=move. if dfs(nx,ny,move+1): return true. board[nx][ny]=-1. return false.",
    ],
  },
  {
    title: "Subsets II",
    topic: "Recursion & Backtracking",
    difficulty: "medium",
    day: 10,
    pattern: "Backtracking",
    description:
      "Given an integer array nums that may contain duplicates, return all possible unique subsets (the power set). The solution set must not contain duplicate subsets.",
    intuition:
      "Sort to group duplicates. Backtrack: at each position, either include or skip. To avoid duplicates, skip nums[i] if it equals nums[i-1] and nums[i-1] wasn't included (i.e., i>start).",
    approach:
      "Sort. dfs(start): add current path to result. For i from start: if i>start and nums[i]==nums[i-1] skip. Include nums[i], dfs(i+1), backtrack.",
    timeComplexity: "O(n * 2^n)",
    spaceComplexity: "O(n)",
    companies: ["Amazon"],
    hints: [
      "Sort first to group duplicates together.",
      "Skip a number if it's the same as the previous and we didn't include the previous (i > start).",
      "dfs(start): result.add(copy of path). for i=start..n-1: if i>start and nums[i]==nums[i-1]: continue. path.add(nums[i]). dfs(i+1). path.remove.",
      "Every node in the recursion tree is a valid subset.",
      "Compare to Subsets I (no duplicates): the only addition is the dedup check on i.",
    ],
  },
  {
    title: "Merge Sort",
    topic: "Recursion & Backtracking",
    difficulty: "easy",
    day: 10,
    pattern: "Divide & Conquer",
    description:
      "Implement merge sort to sort an array of integers in ascending order.",
    intuition:
      "Divide the array in half recursively until subarrays have size 1 (trivially sorted). Merge adjacent sorted subarrays to build up the sorted result.",
    approach:
      "mergeSort(arr, l, r): if l>=r return. mid=(l+r)/2. mergeSort(l,mid). mergeSort(mid+1,r). merge(arr,l,mid,r). Merge: two-pointer merge of left and right sorted halves into temp array.",
    timeComplexity: "O(n log n)",
    spaceComplexity: "O(n)",
    companies: ["Amazon", "Google", "Microsoft"],
    hints: [
      "Divide at midpoint, sort each half recursively, then merge the two sorted halves.",
      "Merge: two pointers, one per half, pick the smaller element each time.",
      "Use a temp array for merging, then copy back.",
      "Base case: if l >= r, return (single or zero elements are sorted).",
      "mergeSort(l,r): mid=(l+r)/2. mergeSort(l,mid). mergeSort(mid+1,r). merge two halves.",
    ],
  },
  {
    title: "Rat in a Maze",
    topic: "Recursion & Backtracking",
    difficulty: "medium",
    day: 10,
    pattern: "Backtracking",
    description:
      "Given an n×n binary matrix (1=open, 0=blocked), find all paths from (0,0) to (n-1,n-1). The rat can move Down, Left, Right, or Up.",
    intuition:
      "Backtrack from (0,0). At each cell, try all 4 directions. Mark cell as visited, recurse, unmark. Record the path when (n-1,n-1) is reached.",
    approach:
      "dfs(r,c,path): if r==n-1 and c==n-1: record path. For each direction (D,L,R,U): if valid and not visited and maze[nr][nc]==1: mark visited, dfs(nr,nc,path+dir), unmark.",
    timeComplexity: "O(4^(n²)) worst case",
    spaceComplexity: "O(n²)",
    companies: ["Amazon"],
    hints: [
      "Backtrack from (0,0): try D/L/R/U. Mark visited cells to avoid cycles.",
      "Only move to cells that are in-bounds, unvisited, and open (value 1).",
      "Record the direction taken at each step to build the path string.",
      "Unmark (backtrack) the cell after exploring all its directions.",
      "dfs(r,c,path,visited): if r==n-1,c==n-1: result.add(path). for each dir: if valid: visited[nr][nc]=1. dfs(nr,nc,path+dirChar,visited). visited[nr][nc]=0.",
    ],
  },
  {
    title: "Count Inversions (Merge Sort)",
    topic: "Recursion & Backtracking",
    difficulty: "hard",
    day: 10,
    pattern: "Merge Sort",
    description:
      "Count the number of inversions in an array using the divide-and-conquer approach.",
    intuition:
      "Merge sort: during the merge of two sorted halves, when a right element is placed before remaining left elements, each of those left elements forms an inversion with the right element.",
    approach:
      "Same as Day 4 Count Inversions — modified merge sort. count += (mid - left_pointer + 1) whenever a right element comes before left elements in merge.",
    timeComplexity: "O(n log n)",
    spaceComplexity: "O(n)",
    companies: ["Amazon", "Microsoft"],
    hints: [
      "Divide array in halves. Count inversions in each half recursively.",
      "During merge: whenever right[j] < left[i], all elements left[i..mid] form inversions with right[j].",
      "Add (mid - i + 1) to count when you pick from the right half.",
      "Combine: total = left_inversions + right_inversions + split_inversions.",
      "split inversions are counted during the merge step.",
    ],
  },

  // ─── Day 11: Linked List Part 1 ─────────────────────────────────────────
  {
    title: "Middle of a Linked List",
    topic: "Linked List",
    difficulty: "easy",
    day: 11,
    pattern: "Fast & Slow Pointers",
    description:
      "Given the head of a singly linked list, return the middle node. If two middle nodes, return the second one.",
    intuition:
      "Slow pointer moves one step, fast pointer moves two. When fast reaches the end, slow is at the middle.",
    approach:
      "slow=head, fast=head. While fast!=null and fast.next!=null: slow=slow.next; fast=fast.next.next. Return slow.",
    timeComplexity: "O(n)",
    spaceComplexity: "O(1)",
    companies: ["Amazon", "Microsoft"],
    hints: [
      "Count nodes, divide by 2 — O(n) with two passes. Can you do one pass?",
      "Fast and slow pointers: fast moves 2x the speed of slow.",
      "When fast reaches the end, slow is exactly at the middle.",
      "slow=fast=head. while fast and fast.next: slow=slow.next; fast=fast.next.next.",
      "Return slow. For even length this returns the second middle.",
    ],
  },
  {
    title: "Reverse Linked List",
    topic: "Linked List",
    difficulty: "easy",
    day: 11,
    pattern: "Iterative / Recursive",
    description:
      "Given the head of a singly linked list, reverse the list and return the reversed list's head.",
    intuition:
      "Iteratively maintain prev, curr, next. Redirect curr.next to prev, advance all three pointers. When curr is null, prev is the new head.",
    approach:
      "prev=null, curr=head. While curr: next=curr.next; curr.next=prev; prev=curr; curr=next. Return prev.",
    timeComplexity: "O(n)",
    spaceComplexity: "O(1)",
    companies: ["Amazon", "Google", "Microsoft", "Meta"],
    hints: [
      "Reverse pointers one by one. Save next before overwriting.",
      "prev=null, curr=head. Repeatedly: save next, reverse pointer, advance.",
      "After the loop curr is null and prev is the new head.",
      "Recursive: reverse(head) = reverse(head.next) then head.next.next=head; head.next=null.",
      "prev=null, curr=head. while curr: nxt=curr.next; curr.next=prev; prev=curr; curr=nxt. return prev.",
    ],
  },
  {
    title: "Remove Cycle in a Linked List",
    topic: "Linked List",
    difficulty: "medium",
    day: 11,
    pattern: "Floyd's Cycle Detection",
    description:
      "Given a linked list that may have a cycle, detect and remove the cycle if one exists.",
    intuition:
      "Use Floyd's algorithm to detect the cycle meeting point. Then find the cycle start (move one pointer to head, advance both one step). The node just before the cycle start is the last node — set its next to null.",
    approach:
      "Detect cycle with fast/slow. If no cycle, return. Move slow=head. Advance both one step. When slow==fast, that's the cycle start. Find the node whose next points to the cycle start and set it to null.",
    timeComplexity: "O(n)",
    spaceComplexity: "O(1)",
    companies: ["Amazon"],
    hints: [
      "Floyd's: fast+slow detect cycle meeting point inside loop.",
      "Reset slow to head. Move both one step. Their meeting point is the cycle start.",
      "Once you find cycle start, traverse the cycle to find the node just before it — that node's next = null removes the cycle.",
      "Special case: cycle at head. Detect this (slow==head) and handle separately.",
      "Detect: slow=fast=head. while fast and fast.next: slow=s.next; fast=f.next.next; if s==f: break. Then find start. Break cycle.",
    ],
  },
  {
    title: "Detect Cycle in a Linked List",
    topic: "Linked List",
    difficulty: "easy",
    day: 11,
    pattern: "Floyd's Cycle Detection",
    description:
      "Given the head of a linked list, return the node where the cycle begins. If there is no cycle, return null.",
    intuition:
      "Use Floyd's cycle detection. After slow==fast (inside cycle), reset slow to head and advance both one step at a time. They meet exactly at the cycle start.",
    approach:
      "Phase 1: slow=fast=head. fast+slow advance until slow==fast or fast reaches null. Phase 2: slow=head. Advance both one step. Return meeting node (or null if no cycle).",
    timeComplexity: "O(n)",
    spaceComplexity: "O(1)",
    companies: ["Amazon", "Google", "Microsoft"],
    hints: [
      "Floyd's slow+fast detects a cycle and finds a meeting node inside the loop.",
      "After meeting inside the loop, reset slow to head. Move both one step at a time — they meet at the cycle start.",
      "This works due to the mathematical property: distance from head to cycle start equals distance from meeting point to cycle start (within the cycle).",
      "Phase 1: slow=s.next, fast=f.next.next until s==f. Phase 2: slow=head; s=s.next, f=f.next until s==f.",
      "Return slow (or fast) when they meet in phase 2.",
    ],
  },
  {
    title: "Merge 2 Sorted Linked Lists",
    topic: "Linked List",
    difficulty: "easy",
    day: 11,
    pattern: "Two Pointers",
    description:
      "Merge two sorted linked lists and return the merged sorted list.",
    intuition:
      "Use a dummy head. Compare heads of both lists; append the smaller one and advance that pointer. Attach remaining list at the end.",
    approach:
      "dummy=ListNode(0), curr=dummy. While l1 and l2: if l1.val<=l2.val: curr.next=l1; l1=l1.next. Else: curr.next=l2; l2=l2.next. curr=curr.next. curr.next = l1 or l2 (whichever remains).",
    timeComplexity: "O(m+n)",
    spaceComplexity: "O(1)",
    companies: ["Amazon", "Google", "Microsoft"],
    hints: [
      "Two pointer technique: always pick the smaller of the two current heads.",
      "Use a dummy node to simplify edge cases (empty lists).",
      "After main loop, attach the remaining non-null list.",
      "dummy.next is the head of the merged list.",
      "while l1 and l2: if l1.val<=l2.val: curr.next=l1; l1=l1.next; else: curr.next=l2; l2=l2.next; curr=curr.next. curr.next=l1 or l2.",
    ],
  },
  {
    title: "Flatten a Linked List",
    topic: "Linked List",
    difficulty: "medium",
    day: 11,
    pattern: "Divide & Conquer / Merge",
    description:
      "Given a linked list where each node has a `next` and `down` pointer, flatten the list so all nodes appear in a single level sorted order.",
    intuition:
      "Recursively flatten from the last column. Merge the current column list with the already-flattened rest, similar to merging two sorted lists.",
    approach:
      "flatten(head): if head==null or head.next==null: return head. head.next = flatten(head.next). head = mergeSorted(head, head.next). Return head.",
    timeComplexity: "O(n * k) where k = number of columns",
    spaceComplexity: "O(k) recursion",
    companies: ["Amazon"],
    hints: [
      "Each column (down-linked list) is sorted. Merge them in pairs.",
      "Recursively flatten the next pointer first, then merge current with the flattened rest.",
      "Merge two down-linked sorted lists using the standard merge two sorted lists technique.",
      "flatten(head): flatten the next chain, then merge head (down list) with next chain.",
      "mergeLists(l1, l2): use dummy, compare l1.val and l2.val, advance via down pointers.",
    ],
  },

  // ─── Day 12: Linked List Part 2 ──────────────────────────────────────────
  {
    title: "Is Linked List a Palindrome",
    topic: "Linked List",
    difficulty: "easy",
    day: 12,
    pattern: "Fast & Slow Pointers",
    description:
      "Given the head of a singly linked list, return true if it is a palindrome, false otherwise. O(n) time and O(1) space.",
    intuition:
      "Find the middle, reverse the second half, compare with the first half, then restore the list.",
    approach:
      "Find middle with slow/fast. Reverse the second half. Compare first half and reversed second half. Restore. Return result.",
    timeComplexity: "O(n)",
    spaceComplexity: "O(1)",
    companies: ["Amazon", "Microsoft"],
    hints: [
      "Collect values into an array and check palindrome — O(n) time and space. Can you do O(1) space?",
      "Find the midpoint, reverse the second half in-place.",
      "Compare first half with reversed second half node by node.",
      "Optionally re-reverse the second half to restore the original list.",
      "slow=fast=head. Advance to mid. Reverse second half. Compare. Done.",
    ],
  },
  {
    title: "Clone List with Random Pointers",
    topic: "Linked List",
    difficulty: "medium",
    day: 12,
    pattern: "Hash Map / Interleaving",
    description:
      "A linked list of length n is given where each node has a `next` and a `random` pointer. Return a deep copy of the list.",
    intuition:
      "Create a map from original nodes to their clones. First pass creates all clones; second pass wires next and random pointers.",
    approach:
      "Pass 1: for each node, create a clone and store in map. Pass 2: for each node, clone.next = map[node.next], clone.random = map[node.random]. Return map[head].",
    timeComplexity: "O(n)",
    spaceComplexity: "O(n) for map",
    companies: ["Amazon", "Microsoft", "Meta"],
    hints: [
      "The random pointer can point to any node — you need to clone all nodes before wiring pointers.",
      "Hash map: original node → clone node. First pass clone, second pass connect.",
      "clone.next = map[node.next] (handle null). clone.random = map[node.random] (handle null).",
      "O(1) space trick: interleave clones with originals (A→A'→B→B'), wire randoms, then separate.",
      "Two-pass with map: O(n) time O(n) space. Interleaving trick: O(n) time O(1) space.",
    ],
  },
  {
    title: "Reverse Linked List II",
    topic: "Linked List",
    difficulty: "medium",
    day: 12,
    pattern: "Iterative Pointer Manipulation",
    description:
      "Given the head of a singly linked list and two integers left and right, reverse the nodes from position left to right. Return the modified list.",
    intuition:
      "Reach the node before position left. Then reverse the sublist from left to right using the same reversal technique, stitching the ends back.",
    approach:
      "Use a dummy head. Navigate to node before left. Then reverse right-left+1 nodes. Reconnect: prev_left.next=new_sublist_head, end_of_reversed.next=node_after_right.",
    timeComplexity: "O(n)",
    spaceComplexity: "O(1)",
    companies: ["Amazon", "Microsoft"],
    hints: [
      "Use a dummy node so you don't have to special-case left==1.",
      "Walk to the node just before position `left` (call it `prev`).",
      "Reverse from curr (at position left) for (right-left+1) steps.",
      "After reversal: prev.next = new head of reversed section; old head of reversed section .next = node after right.",
      "dummy→...→prev→[left...right]→after. Reverse [left..right]. Stitch prev and after.",
    ],
  },
  {
    title: "Add Two Numbers",
    topic: "Linked List",
    difficulty: "medium",
    day: 12,
    pattern: "Simulation",
    description:
      "Two non-empty linked lists represent two non-negative integers in reverse order. Add the two numbers and return the sum as a linked list in reverse order.",
    intuition:
      "Simulate addition digit by digit with carry. Both lists are in reverse order so addition is straightforward from the head.",
    approach:
      "dummy=ListNode(0), curr=dummy, carry=0. While l1 or l2 or carry: sum=carry+(l1.val if l1 else 0)+(l2.val if l2 else 0). carry=sum//10. curr.next=ListNode(sum%10). Advance curr, l1, l2. Return dummy.next.",
    timeComplexity: "O(max(m,n))",
    spaceComplexity: "O(max(m,n))",
    companies: ["Amazon", "Google", "Microsoft"],
    hints: [
      "Process both lists simultaneously digit by digit (they're already in reverse so least significant digit first).",
      "Maintain a carry. Each step: digit = (l1.val + l2.val + carry) % 10, carry = sum // 10.",
      "Use a dummy head to simplify list construction.",
      "After both lists are exhausted, if carry > 0, append one more node.",
      "while l1 or l2 or carry: val = carry + (l1.val if l1 else 0) + (l2.val if l2 else 0). carry=val//10. curr.next=Node(val%10). Advance.",
    ],
  },
  {
    title: "Reverse Nodes in K Groups",
    topic: "Linked List",
    difficulty: "hard",
    day: 12,
    pattern: "Recursive / Iterative",
    description:
      "Given the head of a linked list, reverse every k nodes of the group and return the modified list. If the remaining nodes are less than k, leave them as is.",
    intuition:
      "Check if k nodes exist from current. Reverse those k nodes. Recursively process the rest and connect.",
    approach:
      "Check if k nodes remain (if not, return head). Reverse k nodes. After reversal, original head points to the rest. Recurse: original_head.next = reverseKGroup(next_group, k). Return new_head.",
    timeComplexity: "O(n)",
    spaceComplexity: "O(n/k) recursion",
    companies: ["Amazon", "Google", "Microsoft"],
    hints: [
      "First check if there are k nodes remaining. If not, return the head unchanged.",
      "Reverse k nodes starting from current head. Keep track of the new head and where the next group starts.",
      "After reversing k nodes, connect the original head (now tail of group) to the result of recursing on the next group.",
      "count(head, k): count k nodes, return their start. Reverse k nodes iteratively.",
      "reverseKGroup(head, k): check k exist. Reverse k. head.next = reverseKGroup(kth.next, k). return newHead.",
    ],
  },
  {
    title: "Rotate a Linked List",
    topic: "Linked List",
    difficulty: "medium",
    day: 12,
    pattern: "Pointer Manipulation",
    description:
      "Given the head of a linked list and an integer k, rotate the list to the right by k places.",
    intuition:
      "Rotating by k is equivalent to making it circular and cutting at position (n - k%n). Find the new tail, the new head, and break the cycle.",
    approach:
      "Find length n. k = k % n. If k==0 return head. Traverse to the (n-k)th node (new tail). new_head = new_tail.next. new_tail.next = null. last_node.next = head (make circular, then break).",
    timeComplexity: "O(n)",
    spaceComplexity: "O(1)",
    companies: ["Amazon"],
    hints: [
      "Rotating right by k is the same as taking the last k nodes and putting them at the front.",
      "First find the length. Effective rotation = k % n (k could be larger than n).",
      "Make the list circular: connect the tail to head. Then find the new tail at position n - k%n from the start.",
      "New head = new_tail.next. Set new_tail.next = null.",
      "Connect tail→head. newTail = node at position (n - k%n). head = newTail.next. newTail.next = null.",
    ],
  },

  // ─── Day 13: Stacks & Queues Part 1 ──────────────────────────────────────
  {
    title: "Implement Stack Using Queue",
    topic: "Stacks & Queues",
    difficulty: "easy",
    day: 13,
    pattern: "Design",
    description:
      "Implement a LIFO stack using only FIFO queue operations.",
    intuition:
      "For push: enqueue new element, then rotate existing elements so the new element is at the front (making it the top of the stack).",
    approach:
      "Use one queue. Push(x): enqueue x, then rotate (size-1) elements to the back. Pop: dequeue. Top: peek front. This makes push O(n) and pop O(1).",
    timeComplexity: "Push O(n), Pop O(1)",
    spaceComplexity: "O(n)",
    companies: ["Amazon", "Microsoft"],
    hints: [
      "Stack is LIFO, Queue is FIFO. Push operation must ensure the newest element is at the front of the queue.",
      "After pushing, rotate all existing elements behind the new one.",
      "Rotate: for i in 0..size-2: enqueue(dequeue()).",
      "Pop and top are simply dequeue and peek on the queue front.",
      "push(x): q.enqueue(x). for _ in range(q.size-1): q.enqueue(q.dequeue()). pop=q.dequeue(). top=q.peek().",
    ],
  },
  {
    title: "Next Greater Element I",
    topic: "Stacks & Queues",
    difficulty: "easy",
    day: 13,
    pattern: "Monotonic Stack",
    description:
      "Given two arrays nums1 and nums2 (nums1 is a subset of nums2), for each element in nums1, find the next greater element in nums2. Return -1 if none exists.",
    intuition:
      "Process nums2 with a monotonic decreasing stack. When a larger element is found, it's the NGE for all stack elements smaller than it. Store results in a map.",
    approach:
      "stack=[], map={}. For num in nums2: while stack and stack.top < num: map[stack.pop()] = num. stack.push(num). Remaining in stack: map to -1. For nums1 query the map.",
    timeComplexity: "O(m+n)",
    spaceComplexity: "O(m+n)",
    companies: ["Amazon"],
    hints: [
      "Build a map of element→nextGreater by scanning nums2 once with a stack.",
      "Monotonic decreasing stack: when you see a larger element, it answers all pending smaller elements.",
      "After processing nums2, anything remaining in stack has no NGE → -1.",
      "Then answer queries for nums1 by looking up the map.",
      "for n in nums2: while stack and stack[-1]<n: nge[stack.pop()]=n. stack.append(n). for n in stack: nge[n]=-1.",
    ],
  },
  {
    title: "Implement Queue Using Stack",
    topic: "Stacks & Queues",
    difficulty: "easy",
    day: 13,
    pattern: "Design",
    description:
      "Implement a FIFO queue using only LIFO stack operations.",
    intuition:
      "Use two stacks: inbox for push, outbox for pop. When outbox is empty and pop is needed, transfer all from inbox to outbox. This gives amortised O(1) per operation.",
    approach:
      "Enqueue: push to inbox. Dequeue: if outbox empty, pop all from inbox and push to outbox. Then pop from outbox.",
    timeComplexity: "Amortised O(1) per operation",
    spaceComplexity: "O(n)",
    companies: ["Amazon", "Microsoft"],
    hints: [
      "Two stacks. inbox receives new elements. outbox serves dequeue/peek.",
      "Transfer from inbox to outbox (reverses order) only when outbox is empty.",
      "push: inbox.push(x). pop: if outbox empty: while inbox: outbox.push(inbox.pop()). outbox.pop().",
      "peek: same as pop but outbox.top() instead of outbox.pop().",
      "Each element is moved at most once from inbox to outbox — amortised O(1).",
    ],
  },
  {
    title: "Valid Parentheses",
    topic: "Stacks & Queues",
    difficulty: "easy",
    day: 13,
    pattern: "Stack",
    description:
      "Given a string s containing just '(', ')', '{', '}', '[', ']', determine if the input string is valid. An input string is valid if every open bracket is closed by the same type in the correct order.",
    intuition:
      "Use a stack. Push open brackets. For close brackets, check if the top of the stack is the matching open bracket.",
    approach:
      "stack=[]. For c in s: if c is open: push. Else: if stack empty or top doesn't match: return false. Pop. Return stack is empty.",
    timeComplexity: "O(n)",
    spaceComplexity: "O(n)",
    companies: ["Amazon", "Google", "Microsoft", "Meta"],
    hints: [
      "A stack naturally handles the 'most recent unmatched open' property.",
      "Push open brackets; on close bracket, check stack top for matching open.",
      "Mismatched or empty stack on close → invalid. Non-empty stack at end → invalid.",
      "map = {')':'(', '}':'{', ']':'['}. For c: if open: push. Else: if not stack or stack.top != map[c]: return false; pop.",
      "return len(stack) == 0 at the end.",
    ],
  },
  {
    title: "First Non-Repeating Character in Stream",
    topic: "Stacks & Queues",
    difficulty: "easy",
    day: 13,
    pattern: "Queue + Hash Map",
    description:
      "Given a stream of characters, at each character's arrival, find the first non-repeating character. Return '#' if none exists.",
    intuition:
      "Maintain a queue of characters in arrival order. Track frequencies. At each step, the first non-repeating is the first queue element with frequency 1.",
    approach:
      "queue=[], freq={}. For c in stream: freq[c]++; queue.push(c). While queue not empty and freq[queue.front]>1: queue.pop(). ans += queue.front if queue else '#'.",
    timeComplexity: "O(26n) = O(n)",
    spaceComplexity: "O(26) = O(1)",
    companies: ["Amazon"],
    hints: [
      "A queue preserves order of arrival — the first non-repeating is at the front after filtering repeats.",
      "Maintain a frequency map. The first element in the queue with frequency==1 is the answer.",
      "Remove from front of queue whenever the front becomes a repeat.",
      "queue and freq[26]. for c in stream: freq[c]++; enqueue(c). while front's freq>1: dequeue. answer is front or '#'.",
      "At most 26 dequeues per step since there are only 26 distinct chars.",
    ],
  },
  {
    title: "Reverse First K Elements of Queue",
    topic: "Stacks & Queues",
    difficulty: "easy",
    day: 13,
    pattern: "Stack + Queue",
    description:
      "Given a queue and an integer k, reverse the first k elements of the queue while keeping the rest in original order.",
    intuition:
      "Push first k elements onto a stack (reverses them). Pop stack back to queue. Then rotate remaining (n-k) elements to the back.",
    approach:
      "Push first k elements to stack. Enqueue from stack. Dequeue and re-enqueue the remaining (n-k) elements.",
    timeComplexity: "O(n)",
    spaceComplexity: "O(k)",
    companies: ["Amazon"],
    hints: [
      "A stack reverses order — push k elements, pop them back to the queue.",
      "After re-enqueueing reversed elements, move the remaining elements to maintain their relative order.",
      "Step 1: pop k from queue, push to stack. Step 2: pop stack, enqueue. Step 3: move n-k elements from front to back.",
      "for i in range(k): stack.push(q.dequeue()). while stack: q.enqueue(stack.pop()). for i in range(n-k): q.enqueue(q.dequeue()).",
      "Result: first k reversed, rest unchanged.",
    ],
  },

  // ─── Day 14: Stacks & Queues Part 2 ──────────────────────────────────────
  {
    title: "Time Needed to Buy Tickets",
    topic: "Stacks & Queues",
    difficulty: "easy",
    day: 14,
    pattern: "Queue Simulation",
    description:
      "There are n people in line, each wanting to buy a certain number of tickets. People buy one ticket per round in order. Return the time to buy all tickets for person k.",
    intuition:
      "Person at position k finishes at time equal to: sum over i<k of min(tickets[i], tickets[k]) plus sum over i>=k of min(tickets[i], tickets[k]-1) ... or just simulate with a queue.",
    approach:
      "Simulate: time=0. While tickets[k]>0: for each person: if tickets[i]>0: time++; tickets[i]--. if i==k and tickets[k]==0: return time.",
    timeComplexity: "O(n * max_tickets)",
    spaceComplexity: "O(1)",
    companies: ["Amazon"],
    hints: [
      "Simulate the process: each person buys one ticket per round.",
      "Stop when person k has bought all their tickets.",
      "Formula: for i < k: add min(tickets[i], tickets[k]) to time. For i >= k: add min(tickets[i], tickets[k]-1)+... actually: time = Σ(i<k) min(t[i],t[k]) + Σ(i>=k) min(t[i], t[k]-1+1 if i==k else 0).",
      "Simpler: time = sum(min(t[i], t[k]) for i<=k-1) + sum(min(t[i], t[k]-1) for i>=k+1) + t[k]. Wait — direct formula: Σmin(t[i],t[k]) for i<k + t[k] + Σmin(t[i],t[k]-1) for i>k.",
      "Or just simulate — it's concise and handles all edge cases.",
    ],
  },
  {
    title: "LRU Cache",
    topic: "Stacks & Queues",
    difficulty: "medium",
    day: 14,
    pattern: "Hash Map + Doubly Linked List",
    description:
      "Design and implement an LRU (Least Recently Used) cache with O(1) get and put operations. Evict the least recently used item when capacity is exceeded.",
    intuition:
      "A doubly linked list maintains order of use (most recent at head). A hash map gives O(1) access to any node. On access/insert, move to head. On eviction, remove tail.",
    approach:
      "DLL with dummy head and tail. Map key→node. Get: if exists, move to head, return val. Put: if exists, update, move to head. Else create, add to head. If over capacity, remove tail from map and DLL.",
    timeComplexity: "O(1) per operation",
    spaceComplexity: "O(capacity)",
    companies: ["Amazon", "Google", "Microsoft", "Meta"],
    hints: [
      "O(1) get and O(1) put — you need direct access (map) and order tracking (linked list).",
      "Doubly linked list: head=most recent, tail=least recent. Move accessed node to head.",
      "On capacity overflow: remove the tail node (LRU) from both DLL and map.",
      "Four DLL operations: addToHead, removeNode, removeTail, moveToHead.",
      "map: key→node. get: if key in map: moveToHead(node); return val. put: if key in map: update, moveToHead. Else: new node, addToHead. if size>cap: remove tail from map+DLL.",
    ],
  },
  {
    title: "Get Minimum Element from Stack",
    topic: "Stacks & Queues",
    difficulty: "medium",
    day: 14,
    pattern: "Stack Design",
    description:
      "Design a stack that supports push, pop, top, and retrieving the minimum element in constant time.",
    intuition:
      "Maintain a secondary min-stack that at each level records the minimum so far. When the main stack is popped, pop the min-stack too.",
    approach:
      "Two stacks: main and minStack. Push(x): main.push(x); minStack.push(min(x, minStack.top or x)). Pop: both stacks pop. getMin: return minStack.top.",
    timeComplexity: "O(1) all operations",
    spaceComplexity: "O(n)",
    companies: ["Amazon", "Google", "Microsoft"],
    hints: [
      "A single stack can't retrieve min in O(1). A parallel 'min stack' records running minimums.",
      "minStack[i] = minimum of all elements in main stack from bottom to position i.",
      "push: minStack.push(min(x, minStack.top)). pop: both pop. getMin: minStack.top.",
      "Space-saving trick: only push to minStack when x <= current min.",
      "push(x): stack.push(x). minStack.push(min(x, minStack.top() if minStack else x)). pop: stack.pop(); minStack.pop().",
    ],
  },
  {
    title: "Next Smaller Element",
    topic: "Stacks & Queues",
    difficulty: "medium",
    day: 14,
    pattern: "Monotonic Stack",
    description:
      "Given an array, find the next smaller element for each element. The next smaller element is the first element to the right that is smaller. Return -1 if none.",
    intuition:
      "Monotonic increasing stack: when a smaller element is found, it's the NSE for all stack elements currently larger than it.",
    approach:
      "result = [-1]*n. stack=[]. For i from 0 to n-1: while stack and arr[stack.top] > arr[i]: result[stack.pop()] = arr[i]. stack.push(i). Return result.",
    timeComplexity: "O(n)",
    spaceComplexity: "O(n)",
    companies: ["Amazon"],
    hints: [
      "Similar to Next Greater Element but with a monotonic increasing stack.",
      "When arr[i] < arr[stack.top], arr[i] is the NSE for the top element.",
      "Pop stack and record arr[i] as NSE. Continue popping while stack top is larger than arr[i].",
      "Remaining elements in stack have NSE = -1.",
      "for i in 0..n-1: while stack and arr[stack[-1]]>arr[i]: result[stack.pop()]=arr[i]. stack.append(i). return result.",
    ],
  },
  {
    title: "Celebrity Problem",
    topic: "Stacks & Queues",
    difficulty: "medium",
    day: 14,
    pattern: "Stack / Two Pointers",
    description:
      "In a party of n people, a celebrity is someone who is known by everyone but knows nobody. Given a matrix knows[i][j], find the celebrity or return -1.",
    intuition:
      "Use a stack: if A knows B, eliminate A (can't be celebrity). If A doesn't know B, eliminate B. One candidate remains — verify it.",
    approach:
      "Push all n people to stack. While >1: pop a and b. If knows(a,b): a is eliminated, push b. Else b is eliminated, push a. Verify remaining candidate: known by all, knows nobody.",
    timeComplexity: "O(n)",
    spaceComplexity: "O(n)",
    companies: ["Amazon", "Microsoft"],
    hints: [
      "Key insight: if A knows B, A is not the celebrity. If A doesn't know B, B is not the celebrity.",
      "Use a stack — pair-wise eliminate candidates. One remains as the potential celebrity.",
      "Verify the candidate: they must be known by everyone (n-1 people know them) and know nobody.",
      "Stack approach: while stack.size>1: a=pop, b=pop. if knows(a,b): push b. else push a.",
      "Verify remaining c: for all i≠c: if knows(c,i) or !knows(i,c): return -1. return c.",
    ],
  },

  // ─── Day 15: Stacks & Queues Part 3 ─────────────────────────────────────
  {
    title: "Rotten Oranges",
    topic: "Stacks & Queues",
    difficulty: "medium",
    day: 15,
    pattern: "BFS / Multi-source BFS",
    description:
      "Given a grid of 0 (empty), 1 (fresh orange), 2 (rotten orange), find the minimum time for all oranges to rot. Each minute, a rotten orange rots adjacent fresh ones. Return -1 if impossible.",
    intuition:
      "Multi-source BFS starting from all rotten oranges simultaneously. Each BFS level represents one minute. Count remaining fresh oranges at the end.",
    approach:
      "Queue all initial rotten oranges. BFS: for each rotten orange, spread to adjacent fresh (mark rotten, enqueue). Track levels (time). After BFS, if any fresh remains return -1.",
    timeComplexity: "O(m*n)",
    spaceComplexity: "O(m*n)",
    companies: ["Amazon", "Microsoft"],
    hints: [
      "BFS models the simultaneous spreading. Add all initially rotten oranges to the queue first.",
      "Process level by level — each level represents one minute.",
      "Count fresh oranges initially. Decrement as they rot. If fresh > 0 after BFS, return -1.",
      "4-directional spread. Only spread to cells with value 1.",
      "queue=all 2s. freshCount=count(1s). while queue: time++. for each in current level: spread to fresh neighbors. If freshCount==0: return time. else -1.",
    ],
  },
  {
    title: "Sort a Stack",
    topic: "Stacks & Queues",
    difficulty: "medium",
    day: 15,
    pattern: "Recursive Stack",
    description:
      "Sort a stack using recursion such that the smallest items are on top. You can only use push, pop, peek, and isEmpty operations.",
    intuition:
      "Recursively pop the top, sort the rest, then insert the popped element in the correct position.",
    approach:
      "sortStack(s): if not empty: top=s.pop(); sortStack(s); sortedInsert(s, top). sortedInsert(s, x): if empty or s.peek()<=x: s.push(x). Else: tmp=s.pop(); sortedInsert(s,x); s.push(tmp).",
    timeComplexity: "O(n²)",
    spaceComplexity: "O(n) recursion",
    companies: ["Amazon"],
    hints: [
      "Recursive approach: pop top, sort rest, insert top in correct position.",
      "sortedInsert: pop elements larger than x, push x, push them back.",
      "sortStack(s): top=pop. sortStack(s). sortedInsert(s, top).",
      "sortedInsert(s, x): if empty or top<=x: push x. else: tmp=pop; sortedInsert(s,x); push tmp.",
      "Two mutually recursive functions. Each insert is O(n), n inserts → O(n²).",
    ],
  },
  {
    title: "Stock Span",
    topic: "Stacks & Queues",
    difficulty: "medium",
    day: 15,
    pattern: "Monotonic Stack",
    description:
      "Design a class to calculate the span of the stock's price for the current day. The span is the number of consecutive days (including today) where the price was <= today's price.",
    intuition:
      "Use a monotonic decreasing stack of (price, span). When today's price >= stack.top price, pop and add its span to today's span.",
    approach:
      "Stack stores (price, span). For today's price p: span=1. While stack and stack.top.price <= p: span += stack.top.span; pop. Push (p, span). Return span.",
    timeComplexity: "O(1) amortised",
    spaceComplexity: "O(n)",
    companies: ["Amazon"],
    hints: [
      "Naively: scan backwards from today to count days. O(n²) total. Can you do O(1) amortised?",
      "Store (price, span) in a decreasing stack. When today's price dominates, absorb the span of dominated prices.",
      "span = 1 + spans of all popped entries.",
      "stack: (price, span). while stack.top.price <= today: span += stack.top.span; pop. push (today, span). return span.",
      "Each element is pushed and popped at most once — amortised O(1).",
    ],
  },
  {
    title: "Circular Tour (Gas Station)",
    topic: "Stacks & Queues",
    difficulty: "medium",
    day: 15,
    pattern: "Greedy",
    description:
      "There are n gas stations in a circle. gas[i] is gas available and cost[i] is gas to travel to next. Find the starting station to complete the circuit, or return -1.",
    intuition:
      "If total gas >= total cost, a solution exists. Greedily, if running tank goes negative at station i, the start must be after i (try i+1).",
    approach:
      "totalGas=0, totalCost=0, tank=0, start=0. For i: totalGas+=gas[i], totalCost+=cost[i], tank+=gas[i]-cost[i]. If tank<0: start=i+1, tank=0. If totalGas>=totalCost: return start. Else -1.",
    timeComplexity: "O(n)",
    spaceComplexity: "O(1)",
    companies: ["Amazon"],
    hints: [
      "If total gas < total cost, it's impossible (return -1).",
      "If possible, there's exactly one valid starting point. Find it greedily.",
      "If cumulative tank goes negative at i, start can't be anywhere 0..i — reset to i+1.",
      "track totalTank and runningTank separately. runningTank<0 → reset start.",
      "if totalGas >= totalCost: return start. else: return -1.",
    ],
  },
  {
    title: "Max Area in Histogram",
    topic: "Stacks & Queues",
    difficulty: "hard",
    day: 15,
    pattern: "Monotonic Stack",
    description:
      "Same as Largest Rectangle in Histogram (Day 5). Given heights of histogram bars, find the largest rectangle area.",
    intuition:
      "Monotonic increasing stack: pop when a shorter bar is found and compute rectangle width based on stack state.",
    approach:
      "Same as Day 5 Largest Rectangle. Stack of indices. When heights[i] < heights[stack.top]: pop and compute area = heights[popped] * (i - stack.top - 1). Process remaining after array ends.",
    timeComplexity: "O(n)",
    spaceComplexity: "O(n)",
    companies: ["Amazon", "Google"],
    hints: [
      "For each bar as the minimum height of a rectangle, find the left and right boundaries.",
      "Monotonic increasing stack: pop when current bar is shorter than stack top.",
      "Width when popping = i - stack.top - 1 (distance between adjacent remaining stack elements).",
      "Append a sentinel 0 at the end to flush the stack.",
      "Same solution as Day 5 Largest Rectangle in Histogram.",
    ],
  },

  // ─── Day 16: Binary Trees Part 1 ─────────────────────────────────────────
  {
    title: "Binary Tree Preorder Traversal",
    topic: "Binary Trees",
    difficulty: "easy",
    day: 16,
    pattern: "Tree Traversal",
    description:
      "Given the root of a binary tree, return the preorder traversal (Root → Left → Right) as an array.",
    intuition:
      "Visit root, then recursively visit left subtree, then right subtree. Iteratively use a stack: push right then left so left is processed first.",
    approach:
      "Recursive: visit node, recurse left, recurse right. Iterative: stack=[root]. While stack: node=pop, record, push node.right then node.left.",
    timeComplexity: "O(n)",
    spaceComplexity: "O(h) where h=height",
    companies: ["Amazon"],
    hints: [
      "Root → Left → Right. Visit before going down.",
      "Iterative: push root to stack. Pop, record, push right child then left child (so left is popped first).",
      "Recursive: preorder(node) = [node.val] + preorder(node.left) + preorder(node.right).",
      "Base case: if node is null return.",
      "Stack: push right before left so left comes out first when popped.",
    ],
  },
  {
    title: "Level Order Traversal",
    topic: "Binary Trees",
    difficulty: "medium",
    day: 16,
    pattern: "BFS",
    description:
      "Given the root of a binary tree, return the level order traversal of its nodes' values (i.e., from left to right, level by level).",
    intuition:
      "BFS with a queue. Process all nodes at the current level before moving to the next. Enqueue children as you process parents.",
    approach:
      "queue=[root]. result=[]. While queue: level=[]. For each node in current queue: record val, enqueue children. result.append(level). Return result.",
    timeComplexity: "O(n)",
    spaceComplexity: "O(w) where w=max width",
    companies: ["Amazon", "Google", "Microsoft"],
    hints: [
      "BFS naturally processes nodes level by level.",
      "Use a queue. Process all nodes from the current queue (one full level) before adding next level.",
      "Track level boundaries: snapshot queue size at start of each level.",
      "for _ in range(len(queue)): process current level. then add children.",
      "result is a list of lists, each sublist is one level.",
    ],
  },
  {
    title: "Binary Tree Inorder Traversal",
    topic: "Binary Trees",
    difficulty: "easy",
    day: 16,
    pattern: "Tree Traversal",
    description:
      "Given the root of a binary tree, return the inorder traversal (Left → Root → Right) as an array.",
    intuition:
      "Go as far left as possible using a stack, visit node, then go right. Iteratively: push nodes while going left, pop and record, then go right.",
    approach:
      "Iterative: stack=[], curr=root. While curr or stack: while curr: push curr, curr=curr.left. curr=pop, record, curr=curr.right.",
    timeComplexity: "O(n)",
    spaceComplexity: "O(h)",
    companies: ["Amazon", "Microsoft"],
    hints: [
      "Left → Root → Right. Go as deep left as possible first.",
      "Iterative with stack: push nodes going left. Pop to visit. Then go right.",
      "curr=root, stack=[]. while curr or stack: while curr: stack.append(curr); curr=curr.left. curr=stack.pop(); result.append(curr.val); curr=curr.right.",
      "Inorder of BST gives sorted order.",
      "Recursive: inorder(left) + [root.val] + inorder(right).",
    ],
  },
  {
    title: "Minimum Distance Between BST Nodes",
    topic: "Binary Trees",
    difficulty: "easy",
    day: 16,
    pattern: "Inorder Traversal",
    description:
      "Given the root of a Binary Search Tree, return the minimum difference between the values of any two different nodes in the tree.",
    intuition:
      "Inorder traversal of BST gives sorted values. The minimum difference is between adjacent values in this sorted sequence.",
    approach:
      "Inorder traversal tracking previous node's value. At each step, minDiff = min(minDiff, curr.val - prev.val).",
    timeComplexity: "O(n)",
    spaceComplexity: "O(h)",
    companies: ["Amazon"],
    hints: [
      "BST inorder = sorted sequence. Minimum gap is between consecutive elements.",
      "Do inorder traversal, track previous value, compute difference at each step.",
      "minDiff = INF, prev = -INF. inorder: update minDiff = min(minDiff, node.val - prev); prev = node.val.",
      "No need to store all values — just track the previous inorder value.",
      "return minDiff after full traversal.",
    ],
  },
  {
    title: "Symmetric Tree",
    topic: "Binary Trees",
    difficulty: "easy",
    day: 16,
    pattern: "Tree Recursion",
    description:
      "Given the root of a binary tree, check whether it is a mirror of itself (i.e., symmetric around its center).",
    intuition:
      "A tree is symmetric if the left and right subtrees are mirrors. Two trees are mirrors if their roots match and left's left mirrors right's right, and left's right mirrors right's left.",
    approach:
      "isMirror(left, right): if both null → true. If one null → false. If vals differ → false. Return isMirror(left.left, right.right) and isMirror(left.right, right.left).",
    timeComplexity: "O(n)",
    spaceComplexity: "O(h)",
    companies: ["Amazon", "Microsoft"],
    hints: [
      "Recursively compare left and right subtrees as mirrors.",
      "Two nodes mirror each other: same value, left's left mirrors right's right, left's right mirrors right's left.",
      "isMirror(a, b): if a==b==null: true. if a or b is null: false. if a.val!=b.val: false. return isMirror(a.left,b.right) and isMirror(a.right,b.left).",
      "Call isMirror(root.left, root.right).",
      "Can also solve iteratively with a queue pairing mirror-position nodes.",
    ],
  },
  {
    title: "Binary Tree Postorder Traversal",
    topic: "Binary Trees",
    difficulty: "easy",
    day: 16,
    pattern: "Tree Traversal",
    description:
      "Given the root of a binary tree, return the postorder traversal (Left → Right → Root) as an array.",
    intuition:
      "Postorder = reverse of modified preorder (Root → Right → Left). Do modified preorder with a stack, reverse result.",
    approach:
      "Iterative: stack=[root]. While stack: node=pop, result.append(val), push left then right. Return reverse(result).",
    timeComplexity: "O(n)",
    spaceComplexity: "O(n)",
    companies: ["Amazon"],
    hints: [
      "Left → Right → Root. Postorder is reverse of Root → Right → Left.",
      "Do a modified preorder (root, right, left) and reverse the result.",
      "Stack: push root. Pop, append to result. Push left, then right (so right is popped first giving root-right-left). Reverse result.",
      "Recursive: postorder(left) + postorder(right) + [root.val].",
      "Reverse of modified preorder trick avoids complexity of true iterative postorder.",
    ],
  },

  // ─── Day 17: Binary Trees Part 2 ─────────────────────────────────────────
  {
    title: "Morris Inorder Traversal",
    topic: "Binary Trees",
    difficulty: "easy",
    day: 17,
    pattern: "Morris Traversal",
    description:
      "Perform inorder traversal of a binary tree using O(1) extra space (no stack or recursion). Uses temporary modifications to tree pointers.",
    intuition:
      "For each node: if no left child, visit and go right. Else find the inorder predecessor (rightmost of left subtree). If predecessor.right is null, make it point to current (thread) and go left. If it already points to current, we've returned — undo thread, visit, go right.",
    approach:
      "curr=root. While curr: if no left: visit curr, go right. Else find predecessor: if pred.right is null: pred.right=curr, curr=curr.left. Else (pred.right==curr): pred.right=null, visit curr, curr=curr.right.",
    timeComplexity: "O(n)",
    spaceComplexity: "O(1)",
    companies: ["Amazon"],
    hints: [
      "Morris traversal threads tree temporarily: predecessor's right pointer temporarily points to successor.",
      "If left subtree exists, find the inorder predecessor (rightmost node of left subtree).",
      "If pred.right is null: set thread (pred.right=curr), go left. If pred.right==curr: remove thread, visit, go right.",
      "This way, no stack is needed — the threading provides the 'return path'.",
      "curr=root. while curr: if !curr.left: record curr.val; curr=curr.right. else: pred=inorderPredecessor(curr). if !pred.right: pred.right=curr; curr=curr.left. else: pred.right=null; record curr.val; curr=curr.right.",
    ],
  },
  {
    title: "Diameter of a Binary Tree",
    topic: "Binary Trees",
    difficulty: "easy",
    day: 17,
    pattern: "DFS / Post-order",
    description:
      "Given the root of a binary tree, return the length of the diameter of the tree (the longest path between any two nodes, not necessarily through the root).",
    intuition:
      "For each node, the longest path through it is leftHeight + rightHeight. Use DFS to compute height of each subtree and update the global diameter.",
    approach:
      "dfs(node) returns height. At each node: diameter = max(diameter, leftH + rightH). Return 1 + max(leftH, rightH). Call dfs(root). Return diameter.",
    timeComplexity: "O(n)",
    spaceComplexity: "O(h)",
    companies: ["Amazon", "Google"],
    hints: [
      "The diameter through node n = height(n.left) + height(n.right).",
      "Track max diameter globally as you compute heights with DFS.",
      "dfs returns height. At each call: maxDiam = max(maxDiam, left+right). return 1+max(left,right).",
      "height(null) = 0.",
      "dfs(node): if null: return 0. l=dfs(left). r=dfs(right). maxD=max(maxD, l+r). return 1+max(l,r).",
    ],
  },
  {
    title: "Are Two Trees Identical",
    topic: "Binary Trees",
    difficulty: "easy",
    day: 17,
    pattern: "Tree Recursion",
    description:
      "Given the roots of two binary trees, check if they are the same (identical structure and values at every node).",
    intuition:
      "Recursively: two trees are identical if their roots have the same value and their left and right subtrees are identical.",
    approach:
      "isSame(p, q): if both null → true. If one null → false. If p.val != q.val → false. Return isSame(p.left,q.left) AND isSame(p.right,q.right).",
    timeComplexity: "O(n)",
    spaceComplexity: "O(h)",
    companies: ["Amazon"],
    hints: [
      "Base cases: both null → true (same). One null → false (different structure). Values differ → false.",
      "Recurse on left and right pairs simultaneously.",
      "isSame(p,q): if !p and !q: true. if !p or !q: false. if p.val!=q.val: false. return isSame(p.l,q.l) and isSame(p.r,q.r).",
      "All n nodes must be visited → O(n).",
      "Similar to symmetric tree but comparing two separate trees.",
    ],
  },
  {
    title: "Check if Binary Tree is Mirror of Itself",
    topic: "Binary Trees",
    difficulty: "easy",
    day: 17,
    pattern: "Tree Recursion",
    description:
      "Determine if a binary tree is a mirror of itself — same as the Symmetric Tree problem.",
    intuition:
      "Same as Symmetric Tree: the tree is symmetric if the left and right subtrees are mirror images.",
    approach:
      "isMirror(left, right) — same as Symmetric Tree solution. Call isMirror(root.left, root.right).",
    timeComplexity: "O(n)",
    spaceComplexity: "O(h)",
    companies: ["Amazon"],
    hints: [
      "This is the Symmetric Tree problem.",
      "isMirror(a, b): both null→ true. One null → false. a.val!=b.val → false. Recurse mirror pairs.",
      "Check isMirror(root.left, root.right).",
      "Mirror means: left's left mirrors right's right, and left's right mirrors right's left.",
      "Iterative: queue pairs (left.left, right.right) and (left.right, right.left) for BFS-style check.",
    ],
  },
  {
    title: "Subtree of Another Tree",
    topic: "Binary Trees",
    difficulty: "easy",
    day: 17,
    pattern: "Tree Recursion",
    description:
      "Given the roots of two binary trees root and subRoot, return true if there is a subtree of root with the same structure and node values as subRoot.",
    intuition:
      "For each node of root, check if the tree rooted there is identical to subRoot. Use the isSameTree function as a subroutine.",
    approach:
      "isSubtree(root, subRoot): if root is null: return false. if isSameTree(root, subRoot): return true. Return isSubtree(root.left, subRoot) OR isSubtree(root.right, subRoot).",
    timeComplexity: "O(m*n) where m,n are sizes",
    spaceComplexity: "O(h)",
    companies: ["Amazon"],
    hints: [
      "At each node of root, check if it's the start of an identical subtree.",
      "Reuse isSameTree(a, b) as a helper.",
      "isSubtree(root, sub): if !root: false. if isSameTree(root,sub): true. return isSubtree(root.left,sub) or isSubtree(root.right,sub).",
      "For large trees, string serialization and KMP/Rabin-Karp can do O(m+n).",
      "Simple recursion is O(m*n) — acceptable for interview.",
    ],
  },
  {
    title: "Is Tree Height Balanced",
    topic: "Binary Trees",
    difficulty: "easy",
    day: 17,
    pattern: "DFS Post-order",
    description:
      "Given a binary tree, determine if it is height-balanced — a tree where left and right subtree heights differ by at most 1 for every node.",
    intuition:
      "DFS returning height: if subtree is unbalanced, propagate -1 upwards. If heights differ by >1 at any node, return -1.",
    approach:
      "checkHeight(node): if null return 0. lH=checkHeight(left). rH=checkHeight(right). If either is -1 or |lH-rH|>1: return -1. Return 1+max(lH,rH). isBalanced = checkHeight(root) != -1.",
    timeComplexity: "O(n)",
    spaceComplexity: "O(h)",
    companies: ["Amazon", "Microsoft"],
    hints: [
      "Naive: compute height at each node O(n²). Optimise: return height or -1 (unbalanced) in one DFS.",
      "checkHeight(node): returns actual height if balanced, -1 if not.",
      "At each node: if |leftH - rightH| > 1 → unbalanced → return -1.",
      "Propagate -1 upward: if left or right returns -1, current returns -1 too.",
      "isBalanced(root): return checkHeight(root) != -1.",
    ],
  },

  // ─── Day 18: Binary Trees Part 3 ─────────────────────────────────────────
  {
    title: "Bottom View of a Binary Tree",
    topic: "Binary Trees",
    difficulty: "medium",
    day: 18,
    pattern: "BFS + Vertical Order",
    description:
      "Given a binary tree, print the bottom view — for each horizontal distance (column), print the last node seen (bottom-most) at that column.",
    intuition:
      "Assign each node a horizontal distance (HD). Level-order traversal updates the map[HD]=node.val (later nodes in BFS overwrite = bottom-most). Sort by HD and output values.",
    approach:
      "BFS with queue of (node, HD). map: HD→last node val. For each node: update map[HD]. Enqueue left with HD-1, right with HD+1. Sort map by HD. Return values.",
    timeComplexity: "O(n log n)",
    spaceComplexity: "O(n)",
    companies: ["Amazon"],
    hints: [
      "Assign horizontal distance: root=0, left child=parent-1, right child=parent+1.",
      "BFS ensures we process top-to-bottom — later values at the same HD overwrite earlier ones (bottom view).",
      "Map: HD → node value. Process all nodes in BFS order, always overwriting.",
      "Sort the map keys and return values.",
      "queue: [(root,0)]. map={}. while queue: node,hd=dequeue. map[hd]=node.val. enqueue (left,hd-1),(right,hd+1). return [map[k] for k in sorted(map)].",
    ],
  },
  {
    title: "Top View of a Binary Tree",
    topic: "Binary Trees",
    difficulty: "medium",
    day: 18,
    pattern: "BFS + Vertical Order",
    description:
      "Given a binary tree, print the top view — for each horizontal distance, print the first node seen (top-most).",
    intuition:
      "Same as Bottom View but only record the first time a horizontal distance is seen (BFS → first encounter = top-most).",
    approach:
      "BFS with (node, HD). map: HD→first node val (only set if HD not seen). Sort by HD.",
    timeComplexity: "O(n log n)",
    spaceComplexity: "O(n)",
    companies: ["Amazon"],
    hints: [
      "Same as Bottom View but only update map[HD] if not already set.",
      "BFS ensures first encounter = topmost node.",
      "queue: [(root,0)]. map={}. while queue: node,hd=dequeue. if hd not in map: map[hd]=node.val. enqueue children.",
      "Sort map keys, output values.",
      "Top View vs Bottom View: only difference is whether you overwrite or not.",
    ],
  },
  {
    title: "Lowest Common Ancestor (LCA)",
    topic: "Binary Trees",
    difficulty: "medium",
    day: 18,
    pattern: "Tree Recursion",
    description:
      "Given a binary tree and two nodes p and q, find their lowest common ancestor — the deepest node that is an ancestor of both.",
    intuition:
      "If current node is p or q, return it. Recurse left and right. If both sides return non-null, current is the LCA. If only one side returns non-null, propagate that up.",
    approach:
      "lca(root, p, q): if null or root==p or root==q: return root. left=lca(left,p,q). right=lca(right,p,q). If both non-null: return root. Return left or right (whichever is non-null).",
    timeComplexity: "O(n)",
    spaceComplexity: "O(h)",
    companies: ["Amazon", "Google", "Microsoft", "Meta"],
    hints: [
      "If you find p or q, return it — no need to go deeper for that path.",
      "After recursing left and right: if both return non-null, current node is the LCA.",
      "If only one side returns non-null, propagate it up.",
      "lca(root,p,q): if !root or root==p or root==q: return root. l=lca(l,p,q); r=lca(r,p,q). if l and r: return root. return l or r.",
      "O(n) single pass. Works for any binary tree (not just BST).",
    ],
  },
  {
    title: "Kth Level of a Binary Tree",
    topic: "Binary Trees",
    difficulty: "medium",
    day: 18,
    pattern: "BFS / DFS",
    description:
      "Given a binary tree and an integer k, return all nodes at the k-th level (root is level 1).",
    intuition:
      "BFS: process nodes level by level; at level k, collect all nodes. Or DFS: recurse with level counter, collect when level == k.",
    approach:
      "BFS: use queue with level tracking. When level == k, record all nodes in current queue snapshot. Return those nodes.",
    timeComplexity: "O(n)",
    spaceComplexity: "O(w) where w=max width",
    companies: ["Amazon"],
    hints: [
      "BFS naturally gives nodes level by level. Stop at level k.",
      "DFS: pass level as parameter. When level==k, add to result.",
      "BFS: queue = [root]. for lvl in 1..k: process current level, enqueue next. At level k, record values.",
      "DFS: dfs(node, level, k, result): if node and level==k: result.add(node.val). else: dfs(left,level+1,k,result). dfs(right,level+1,k,result).",
      "Both O(n) but BFS avoids full traversal if k is small.",
    ],
  },
  {
    title: "Construct Binary Tree from Inorder and Preorder",
    topic: "Binary Trees",
    difficulty: "medium",
    day: 18,
    pattern: "Divide & Conquer",
    description:
      "Given preorder and inorder traversal arrays, construct and return the binary tree.",
    intuition:
      "Preorder's first element is the root. Find it in inorder — everything to its left is the left subtree, right is right subtree. Recursively build.",
    approach:
      "Build index map for inorder. build(preL, preR, inL, inR): root=preorder[preL]. inIdx=map[root]. leftSize=inIdx-inL. left subtree: build(preL+1, preL+leftSize, inL, inIdx-1). right: build(preL+leftSize+1, preR, inIdx+1, inR).",
    timeComplexity: "O(n)",
    spaceComplexity: "O(n)",
    companies: ["Amazon", "Google"],
    hints: [
      "Preorder: root first. Inorder: left subtree, root, right subtree.",
      "Preorder[0] = root. Find root's index in inorder → splits inorder into left and right subtrees.",
      "Left subtree size = rootIndex - inorderStart. Use this to split preorder too.",
      "Hash map inorder values to indices for O(1) lookup.",
      "build(preL, inL, inR): if inL>inR return null. root=preorder[preL]. idx=inMap[root]. left=build(preL+1, inL, idx-1). right=build(preL+(idx-inL)+1, idx+1, inR). return root.",
    ],
  },
  {
    title: "Transform to Sum Tree",
    topic: "Binary Trees",
    difficulty: "medium",
    day: 18,
    pattern: "DFS Post-order",
    description:
      "Given a binary tree, convert it to a sum tree where each node's value is replaced with the sum of the values of all its descendants (left and right subtrees).",
    intuition:
      "Post-order: after computing sums for children, update parent's value to leftSum + rightSum. Return old value + new sum for parent's calculation.",
    approach:
      "toSumTree(node): if null return 0. oldLeft=toSumTree(left). oldRight=toSumTree(right). old=node.val. node.val=oldLeft+node.left.val+oldRight+node.right.val (or simply left sum + right sum). Return old + node.val.",
    timeComplexity: "O(n)",
    spaceComplexity: "O(h)",
    companies: ["Amazon"],
    hints: [
      "Process children first (post-order), then update parent.",
      "Each node's new value = sum of all values in its subtree (excluding itself after transformation? — check problem definition).",
      "toSumTree(node): if leaf: oldVal=node.val; node.val=0; return oldVal. leftSum=toSumTree(left). rightSum=toSumTree(right). oldVal=node.val. node.val=leftSum+rightSum. return node.val+oldVal.",
      "The function returns the sum of original values in the subtree (for the parent to use).",
      "Post-order traversal ensures children are processed before parents.",
    ],
  },

  // ─── Day 19: Binary Trees Part 4 ─────────────────────────────────────────
  {
    title: "Flatten Binary Tree to Linked List",
    topic: "Binary Trees",
    difficulty: "medium",
    day: 19,
    pattern: "Morris / Reverse Preorder",
    description:
      "Given the root of a binary tree, flatten it in-place into a linked list following preorder traversal order. Use the right pointer; set all left pointers to null.",
    intuition:
      "Reverse preorder (Root, Right, Left): process right subtree, then left, threading each node to the previous. Or: find the rightmost node of the left subtree, connect right subtree to it, move left subtree to right.",
    approach:
      "For each node: find the rightmost of left subtree (predecessor). Set pred.right = node.right. node.right = node.left. node.left = null. Move to node.right. Repeat.",
    timeComplexity: "O(n)",
    spaceComplexity: "O(1)",
    companies: ["Amazon", "Google"],
    hints: [
      "Preorder: root, left, right. After flattening, right pointer creates the linked list.",
      "For each node with a left child: find the rightmost node of the left subtree. Attach current right subtree to it. Move left subtree to right. Nullify left.",
      "Move to the right child and repeat.",
      "node→leftSubtree→rightSubtree. rightmost(left).right=rightSubtree. node.right=left. node.left=null.",
      "while node: if left: find rightmost of left; rightmost.right=node.right; node.right=node.left; node.left=null. node=node.right.",
    ],
  },
  {
    title: "Maximum Path Sum in Binary Tree",
    topic: "Binary Trees",
    difficulty: "hard",
    day: 19,
    pattern: "DFS Post-order",
    description:
      "Given the root of a binary tree, return the maximum path sum of any non-empty path. A path may start and end at any node.",
    intuition:
      "At each node: the maximum path through it is leftGain + node.val + rightGain (where gains are max of 0 and left/right returns). Update global max. Return node.val + max(leftGain, rightGain) for the parent's calculation.",
    approach:
      "maxGain(node): if null return 0. leftGain=max(0, maxGain(left)). rightGain=max(0, maxGain(right)). maxPath=max(maxPath, leftGain+node.val+rightGain). Return node.val+max(leftGain, rightGain).",
    timeComplexity: "O(n)",
    spaceComplexity: "O(h)",
    companies: ["Amazon", "Google", "Microsoft"],
    hints: [
      "A path can go through any node as the 'highest' point, with branches going down.",
      "For each node: best path through it = leftMax + node.val + rightMax (clamped to 0).",
      "But you can only extend one branch upward to the parent, so return node.val + max(left,right).",
      "Clamp negative gains to 0: leftGain=max(0, dfs(left)).",
      "maxGain(n): if !n: 0. l=max(0,dfs(l)). r=max(0,dfs(r)). ans=max(ans, l+n.val+r). return n.val+max(l,r).",
    ],
  },
  {
    title: "Maximum Width of Binary Tree",
    topic: "Binary Trees",
    difficulty: "medium",
    day: 19,
    pattern: "BFS with Indexing",
    description:
      "Given the root of a binary tree, return the maximum width of the tree. Width of a level = index of rightmost node − index of leftmost node + 1 (including null nodes in between).",
    intuition:
      "BFS with node indices: if a node has index i, its left child is 2i and right child is 2i+1. Width of level = last index − first index + 1. Normalise to prevent overflow.",
    approach:
      "queue with (node, index). For each level: record first index. Width = last index − first index + 1. Enqueue children with 2*idx and 2*idx+1. Normalise each level by subtracting the level's first index.",
    timeComplexity: "O(n)",
    spaceComplexity: "O(w)",
    companies: ["Amazon"],
    hints: [
      "Assign indices: root=0, left child=2*parent, right child=2*parent+1.",
      "Level width = lastIdx - firstIdx + 1.",
      "To prevent integer overflow, normalise: subtract the level's minimum index from all indices in that level.",
      "BFS: queue of (node, index). At each level, track min and max index. Update maxWidth.",
      "queue=[(root,0)]. for each level: offset=queue[0].idx. for each node: width=max(width, idx-offset+1). enqueue (left,2*(idx-offset)), (right,2*(idx-offset)+1).",
    ],
  },
  {
    title: "Construct Binary Tree from Inorder and Postorder",
    topic: "Binary Trees",
    difficulty: "medium",
    day: 19,
    pattern: "Divide & Conquer",
    description:
      "Given inorder and postorder traversal arrays, construct and return the binary tree.",
    intuition:
      "Postorder's last element is the root. Find it in inorder — everything left is the left subtree. Build recursively.",
    approach:
      "Build inorder index map. build(postL, postR, inL, inR): root=postorder[postR]. inIdx=map[root]. rightSize=inR-inIdx. right=build(postR-rightSize, postR-1, inIdx+1, inR). left=build(postL, postR-rightSize-1, inL, inIdx-1).",
    timeComplexity: "O(n)",
    spaceComplexity: "O(n)",
    companies: ["Amazon"],
    hints: [
      "Postorder: last element is root. Inorder: root splits left and right subtrees.",
      "Find root in inorder to get right subtree size and left subtree size.",
      "build inorder index map. build(postL, postR, inL, inR): root=post[postR]. find in inorder. recurse.",
      "Similar to construct from inorder+preorder but root comes from the end of postorder.",
      "Process right subtree before left (postorder is L,R,Root so right subtree is immediately before root in postorder).",
    ],
  },
  {
    title: "Zigzag Level Order Traversal",
    topic: "Binary Trees",
    difficulty: "medium",
    day: 19,
    pattern: "BFS",
    description:
      "Given the root of a binary tree, return the zigzag level order traversal: left to right for level 1, right to left for level 2, and so on.",
    intuition:
      "Standard BFS level order traversal, but reverse the order of each alternate level's collection.",
    approach:
      "BFS with level tracking. Collect each level normally. If level is even (0-indexed), reverse the collection before adding to result.",
    timeComplexity: "O(n)",
    spaceComplexity: "O(w)",
    companies: ["Amazon", "Google"],
    hints: [
      "Standard BFS but alternate the direction of collection each level.",
      "Odd levels: collect left-to-right. Even levels: collect right-to-left (or reverse).",
      "Use a flag `leftToRight`. Append to level list normally; if !leftToRight, reverse before adding to result.",
      "Or use a deque — append to front or back based on direction.",
      "BFS level by level. result.append(level if leftToRight else reversed(level)). Toggle flag each level.",
    ],
  },
  {
    title: "Kth Ancestor of a Tree Node",
    topic: "Binary Trees",
    difficulty: "hard",
    day: 19,
    pattern: "Binary Lifting / DFS",
    description:
      "Given a tree with n nodes and queries (node, k), find the kth ancestor of node in O(log n) per query after O(n log n) preprocessing.",
    intuition:
      "Binary Lifting: precompute ancestor[node][j] = 2^j-th ancestor. Answer each query by decomposing k in binary and jumping.",
    approach:
      "Precompute ancestor table (n × log n). ancestor[node][0] = parent. ancestor[node][j] = ancestor[ancestor[node][j-1]][j-1]. For query(node, k): decompose k in binary, jump accordingly.",
    timeComplexity: "O(n log n) preprocessing, O(log n) per query",
    spaceComplexity: "O(n log n)",
    companies: ["Amazon"],
    hints: [
      "Naive: follow parent pointers k times — O(k). Binary lifting: O(log k) per query.",
      "ancestor[v][0] = direct parent. ancestor[v][j] = ancestor[ancestor[v][j-1]][j-1].",
      "For query k: process bits of k from high to low — if bit j is set, jump 2^j steps.",
      "Precompute with DFS from root. Max j = log2(n).",
      "ancestor[v][j] = ancestor[ancestor[v][j-1]][j-1]. Query: for j from LOG-1 to 0: if k&(1<<j): v=ancestor[v][j]. return v.",
    ],
  },

  // ─── Day 20: BST Part 1 ──────────────────────────────────────────────────
  {
    title: "Kth Largest Element in BST",
    topic: "BST",
    difficulty: "easy",
    day: 20,
    pattern: "Reverse Inorder",
    description:
      "Given the root of a BST and an integer k, return the kth largest element.",
    intuition:
      "Reverse inorder traversal of BST (Right → Root → Left) yields descending order. The kth element in this traversal is the kth largest.",
    approach:
      "Reverse inorder: go right, visit, go left. Decrement k at each visit. When k==0 return current value.",
    timeComplexity: "O(h + k)",
    spaceComplexity: "O(h)",
    companies: ["Amazon", "Microsoft"],
    hints: [
      "BST inorder = ascending. Reverse inorder = descending. Kth in descending = kth largest.",
      "reverseInorder(node): if !node return. reverseInorder(right). k--. if k==0: ans=node.val; return. reverseInorder(left).",
      "Stop as soon as k reaches 0.",
      "Iterative with stack going right-first.",
      "dfs(right), visit (k--), dfs(left). Stop early when k==0.",
    ],
  },
  {
    title: "Sorted Array to Balanced BST",
    topic: "BST",
    difficulty: "easy",
    day: 20,
    pattern: "Divide & Conquer",
    description:
      "Given an integer array sorted in ascending order, convert it to a height-balanced BST.",
    intuition:
      "The middle element of the array becomes the root (balancing left and right subtrees). Recursively build left subtree from left half and right subtree from right half.",
    approach:
      "build(l, r): if l>r return null. mid=(l+r)/2. root=TreeNode(nums[mid]). root.left=build(l,mid-1). root.right=build(mid+1,r). Return root.",
    timeComplexity: "O(n)",
    spaceComplexity: "O(log n) stack",
    companies: ["Amazon", "Microsoft"],
    hints: [
      "Middle element becomes root — ensures equal elements on both sides.",
      "Recursively apply to left and right halves.",
      "build(l, r): mid=(l+r)/2. root=Node(arr[mid]). root.left=build(l,mid-1). root.right=build(mid+1,r). return root.",
      "Height-balanced because each level is divided equally.",
      "Base case: l>r → return null.",
    ],
  },
  {
    title: "Kth Smallest Element in BST",
    topic: "BST",
    difficulty: "medium",
    day: 20,
    pattern: "Inorder Traversal",
    description:
      "Given the root of a BST and an integer k, return the kth smallest value.",
    intuition:
      "Inorder traversal of BST yields sorted ascending order. The kth element in inorder is the kth smallest.",
    approach:
      "Inorder DFS: visit left, visit root (decrement k), visit right. When k==0, record answer. Or iterative with stack.",
    timeComplexity: "O(h + k)",
    spaceComplexity: "O(h)",
    companies: ["Amazon", "Google", "Microsoft"],
    hints: [
      "BST inorder = sorted ascending. kth in inorder = kth smallest.",
      "Traverse inorder, count down k. When k hits 0, return current value.",
      "Iterative: stack+curr. Go left, pop, k--. If k==0 return val. Go right.",
      "dfs(node): if !node: return. dfs(left). k--. if k==0: ans=node.val; return. dfs(right).",
      "O(h+k) — you stop as soon as k-th element is found.",
    ],
  },
  {
    title: "LCA in BST",
    topic: "BST",
    difficulty: "medium",
    day: 20,
    pattern: "BST Property",
    description:
      "Given a BST and two nodes p and q, find their lowest common ancestor.",
    intuition:
      "In a BST: if both p and q are less than root, LCA is in the left subtree. If both are greater, LCA is in the right. If one is on each side (or one equals root), root is the LCA.",
    approach:
      "Iterative: while true: if both p,q < curr: curr=curr.left. Elif both >curr: curr=curr.right. Else return curr.",
    timeComplexity: "O(h)",
    spaceComplexity: "O(1)",
    companies: ["Amazon", "Microsoft"],
    hints: [
      "BST allows us to determine which direction to go using values alone.",
      "If both nodes are smaller than current, LCA must be in the left subtree.",
      "If both are larger, LCA is in the right subtree.",
      "If they're on different sides (or one equals current), current is the LCA.",
      "while curr: if p.val<curr.val and q.val<curr.val: curr=curr.left. elif both>: curr=curr.right. else: return curr.",
    ],
  },
  {
    title: "Validate Binary Search Tree",
    topic: "BST",
    difficulty: "medium",
    day: 20,
    pattern: "DFS with Range",
    description:
      "Given the root of a binary tree, determine if it is a valid BST. In a valid BST, left subtree nodes are strictly less than the root, and right subtree nodes are strictly greater.",
    intuition:
      "Pass min and max bounds through DFS. At each node, value must be strictly within (min, max). Left child gets (min, node.val). Right child gets (node.val, max).",
    approach:
      "validate(node, min, max): if null return true. If node.val<=min or node.val>=max return false. Return validate(left, min, node.val) AND validate(right, node.val, max).",
    timeComplexity: "O(n)",
    spaceComplexity: "O(h)",
    companies: ["Amazon", "Google", "Microsoft"],
    hints: [
      "Not enough to check just parent-child. A right subtree node can violate BST with a distant ancestor.",
      "Pass valid range (min, max) and ensure each node's value is strictly within.",
      "validate(node, low, high): if !node: true. if val<=low or val>=high: false. return validate(left,low,val) and validate(right,val,high).",
      "Initial call: validate(root, -INF, +INF).",
      "Alternatively: inorder traversal should produce strictly increasing sequence.",
    ],
  },

  // ─── Day 21: BST Part 2 ──────────────────────────────────────────────────
  {
    title: "Recover BST",
    topic: "BST",
    difficulty: "medium",
    day: 21,
    pattern: "Inorder Traversal",
    description:
      "Two nodes of a BST have been swapped by mistake. Recover the BST without changing its structure.",
    intuition:
      "Inorder traversal should produce sorted sequence. Find the two nodes where the sorted order is violated and swap their values back.",
    approach:
      "Inorder traversal with prev pointer. First violation: first=prev, second=curr. Second violation (if any): second=curr. After traversal, swap first.val and second.val.",
    timeComplexity: "O(n)",
    spaceComplexity: "O(h), or O(1) with Morris",
    companies: ["Amazon", "Microsoft"],
    hints: [
      "BST inorder = sorted. Two swapped nodes cause 1 or 2 inversions.",
      "Inorder traversal with prev: when prev.val >= curr.val, we found a violation.",
      "First violation: first=prev. Always: second=curr. Second violation overwrites second only.",
      "After traversal: swap(first.val, second.val).",
      "Morris traversal can do this in O(1) space.",
    ],
  },
  {
    title: "Populate Next Right Pointers",
    topic: "BST",
    difficulty: "medium",
    day: 21,
    pattern: "BFS / Level Order",
    description:
      "Populate each node's next pointer to point to the next right node. If no next right node, set to null. The tree is a perfect binary tree.",
    intuition:
      "Level order traversal: for each level, link consecutive nodes with next pointers. For a perfect binary tree, can also use the existing next pointers to traverse O(1) space.",
    approach:
      "O(1) space: use previous level's next pointers to connect current level. For each node in current level: node.left.next=node.right. If node.next: node.right.next=node.next.left. Advance using next pointers.",
    timeComplexity: "O(n)",
    spaceComplexity: "O(1)",
    companies: ["Amazon", "Microsoft"],
    hints: [
      "BFS level-order approach: O(n) space. For O(1), use already-set next pointers from previous level.",
      "For a perfect BT at each level: node.left.next = node.right; if node.next then node.right.next = node.next.left.",
      "Start at the leftmost node of each level, traverse using next pointers, connect the level below.",
      "leftmost = root. while leftmost.left: curr=leftmost. while curr: curr.left.next=curr.right; if curr.next: curr.right.next=curr.next.left; curr=curr.next. leftmost=leftmost.left.",
      "O(1) space because we use the already-populated next pointers of the current level to fill the next.",
    ],
  },
  {
    title: "Construct BST from Preorder Traversal",
    topic: "BST",
    difficulty: "medium",
    day: 21,
    pattern: "BST Property / Monotonic Stack",
    description:
      "Given an array of integers preorder (a valid BST preorder), construct and return the BST.",
    intuition:
      "Use the BST property: for each element in preorder, elements smaller than it go left, larger go right. Use upper bound recursion or monotonic stack.",
    approach:
      "Recursive with upper bound: build(bound): if i==n or preorder[i]>=bound return null. root=preorder[i++]. root.left=build(root.val). root.right=build(bound). Return root.",
    timeComplexity: "O(n)",
    spaceComplexity: "O(h)",
    companies: ["Amazon"],
    hints: [
      "BST preorder: root, then all left subtree (values < root), then all right subtree (values > root).",
      "Recursive with bound: create root from current element; build left subtree bounded by root's value; build right bounded by parent's bound.",
      "idx=0. build(bound=INF): if preorder[idx]>=bound return null. root=Node(preorder[idx++]). root.left=build(root.val). root.right=build(bound). return root.",
      "Monotonic stack approach also works in O(n).",
      "Each element is processed exactly once → O(n).",
    ],
  },
  {
    title: "BST Iterator",
    topic: "BST",
    difficulty: "medium",
    day: 21,
    pattern: "Controlled Inorder",
    description:
      "Implement an iterator over a BST that returns nodes in ascending order. next() and hasNext() should run in O(h) amortised time and O(h) space.",
    intuition:
      "Simulate inorder with a stack. Initialise by pushing all left children from root. next() pops top, pushes left children of right child.",
    approach:
      "Stack: push root and all left children of root. hasNext(): stack not empty. next(): pop top, push left children of top.right. Return top's value.",
    timeComplexity: "O(h) amortised per next()",
    spaceComplexity: "O(h)",
    companies: ["Amazon", "Google"],
    hints: [
      "Full inorder traversal → O(n) space. Lazy evaluation with a stack → O(h) space.",
      "init: push all leftmost path from root. next: pop, then push leftmost path from right child.",
      "hasNext: return stack is not empty.",
      "__init__: push leftPath(root). next: node=pop. push leftPath(node.right). return node.val.",
      "leftPath(node): while node: push; node=node.left.",
    ],
  },
  {
    title: "Flatten BST to Sorted List",
    topic: "BST",
    difficulty: "medium",
    day: 21,
    pattern: "Inorder Traversal",
    description:
      "Given the root of a BST, flatten it to a sorted linked list using the right pointer. Set all left pointers to null.",
    intuition:
      "Inorder traversal gives sorted order. Thread each node's right pointer to the next inorder node and set left to null.",
    approach:
      "Inorder traversal with prev pointer. When visiting a node: if prev: prev.right=curr, prev.left=null. prev=curr. After traversal, last node's right is null.",
    timeComplexity: "O(n)",
    spaceComplexity: "O(h)",
    companies: ["Amazon"],
    hints: [
      "BST inorder = sorted. Link nodes in inorder using right pointers.",
      "Keep track of the previous node in inorder. prev.right = current. prev.left = null.",
      "prev=null, curr=root. inorder: visit node: if prev: prev.right=node, prev.left=null. prev=node.",
      "The head of the result is the leftmost node.",
      "Morris traversal can do this in O(1) space.",
    ],
  },

  // ─── Day 22: BST Part 3 ──────────────────────────────────────────────────
  {
    title: "Merge Two BSTs",
    topic: "BST",
    difficulty: "hard",
    day: 22,
    pattern: "Inorder + Merge Sorted Arrays",
    description:
      "Given the roots of two BSTs, merge them into a single balanced BST.",
    intuition:
      "Get inorder traversal (sorted array) from each BST. Merge the two sorted arrays. Build a balanced BST from the merged sorted array.",
    approach:
      "inorder(tree1) → arr1. inorder(tree2) → arr2. merged = merge(arr1, arr2). Build BST from sorted merged array (like Sorted Array to BST).",
    timeComplexity: "O(m+n)",
    spaceComplexity: "O(m+n)",
    companies: ["Amazon", "Microsoft"],
    hints: [
      "Two sorted arrays (inorder of each BST) can be merged in O(m+n).",
      "Then build a balanced BST from the merged sorted array in O(m+n).",
      "Three steps: inorder BST1, inorder BST2, merge, build balanced BST.",
      "mergeSorted(arr1, arr2): two pointers, standard merge.",
      "buildBalancedBST(arr, l, r): mid=(l+r)/2, root=arr[mid], recurse.",
    ],
  },
  {
    title: "Serialize and Deserialize BST",
    topic: "BST",
    difficulty: "hard",
    day: 22,
    pattern: "Preorder + BST Property",
    description:
      "Design an algorithm to serialize and deserialize a BST. The serialized form should be space-efficient.",
    intuition:
      "For BST: preorder serialization alone is sufficient to reconstruct (unlike general BT which needs two traversals or null markers). Use space-separated values.",
    approach:
      "Serialize: preorder traversal, join values. Deserialize: parse values, use BST property with bounds to insert (same as Construct BST from Preorder).",
    timeComplexity: "O(n)",
    spaceComplexity: "O(n)",
    companies: ["Amazon"],
    hints: [
      "BST preorder is unique — no need for null markers unlike general binary tree.",
      "Serialize: preorder traversal, values separated by commas.",
      "Deserialize: build BST from preorder using bound-based recursion.",
      "build(bound): if i==n or arr[i]>=bound: return null. root=arr[i++]. root.left=build(root.val). root.right=build(bound).",
      "For general binary tree, serialize with null markers and use BFS or preorder+null markers.",
    ],
  },
  {
    title: "Inorder Predecessor in BST",
    topic: "BST",
    difficulty: "medium",
    day: 22,
    pattern: "BST Traversal",
    description:
      "Given a BST and a node, find its inorder predecessor (the largest node smaller than the given node).",
    intuition:
      "If the node has a left child, the predecessor is the rightmost node of the left subtree. Otherwise, traverse from root: whenever we go right, the current node is a predecessor candidate. Return the last such candidate.",
    approach:
      "If node.left: return rightmost(node.left). Else: predecessor=null, curr=root. While curr!=node: if curr.val<node.val: predecessor=curr, curr=curr.right. Else curr=curr.left. Return predecessor.",
    timeComplexity: "O(h)",
    spaceComplexity: "O(1)",
    companies: ["Amazon"],
    hints: [
      "Case 1: node has left child → predecessor = rightmost node of left subtree.",
      "Case 2: no left child → traverse from root, track last time we go right (that ancestor is the predecessor).",
      "Going right means current is smaller than target — it could be the predecessor.",
      "rightmost(node): while node.right: node=node.right. return node.",
      "pred=null. curr=root. while curr: if curr.val<node.val: pred=curr; curr=curr.right. else: curr=curr.left. return pred.",
    ],
  },
  {
    title: "Largest BST in a Binary Tree",
    topic: "BST",
    difficulty: "medium",
    day: 22,
    pattern: "DFS Post-order",
    description:
      "Given a binary tree, find the largest subtree which is a BST. Return the number of nodes in the largest BST.",
    intuition:
      "Bottom-up DFS: for each node, check if the subtree rooted there is a valid BST (using min/max/size). If valid BST, update global max size.",
    approach:
      "largestBST(node) returns (size, min, max, isBST). Leaf: (1, val, val, true). Combine: isBST = left.isBST and right.isBST and left.max<node.val<right.min. Update ans with size if BST.",
    timeComplexity: "O(n)",
    spaceComplexity: "O(h)",
    companies: ["Amazon"],
    hints: [
      "Post-order: check children first, then determine if current subtree is a BST.",
      "Return (isBST, size, min, max) from each node.",
      "BST condition: node.val > left.max and node.val < right.min and both subtrees are BSTs.",
      "If BST: size = left.size + right.size + 1. Update global max.",
      "dfs(node): if null: (true, 0, INF, -INF). l=dfs(left). r=dfs(right). isBST = l.bst and r.bst and l.max<val<r.min. return (isBST, size, min(l.min,val), max(r.max,val)).",
    ],
  },
  {
    title: "Inorder Successor in BST",
    topic: "BST",
    difficulty: "medium",
    day: 22,
    pattern: "BST Traversal",
    description:
      "Given a BST and a node, find its inorder successor (the smallest node greater than the given node).",
    intuition:
      "If the node has a right child, the successor is the leftmost node of the right subtree. Otherwise, traverse from root: whenever we go left, the current node is a successor candidate.",
    approach:
      "If node.right: return leftmost(node.right). Else: successor=null, curr=root. While curr!=node: if curr.val>node.val: successor=curr, curr=curr.left. Else curr=curr.right. Return successor.",
    timeComplexity: "O(h)",
    spaceComplexity: "O(1)",
    companies: ["Amazon", "Microsoft"],
    hints: [
      "Case 1: node has right child → successor = leftmost of right subtree.",
      "Case 2: no right child → traverse from root, track last time you go left.",
      "Going left means current > target → could be the successor.",
      "succ=null, curr=root. while curr: if curr.val>node.val: succ=curr; curr=curr.left. else: curr=curr.right.",
      "return succ.",
    ],
  },

  // ─── Day 23: Heaps ────────────────────────────────────────────────────────
  {
    title: "Merge K Sorted Arrays",
    topic: "Heaps",
    difficulty: "easy",
    day: 23,
    pattern: "Min-Heap",
    description:
      "Given k sorted arrays, merge them into one sorted array.",
    intuition:
      "Use a min-heap of size k. Initially push the first element of each array. Repeatedly pop the minimum, add to result, push the next element from the same array.",
    approach:
      "minHeap = [(arr[0][0], arrIdx, elemIdx) for each array]. While heap: val, i, j = pop. result.append(val). If j+1 < len(arr[i]): push (arr[i][j+1], i, j+1).",
    timeComplexity: "O(n log k) where n=total elements",
    spaceComplexity: "O(k)",
    companies: ["Amazon", "Google", "Microsoft"],
    hints: [
      "Min-heap of size k: track which array and which index each element came from.",
      "Pop minimum → add to result → push next element from the same array.",
      "Heap entry: (value, arrayIndex, elementIndex).",
      "heap=[(arr[i][0],i,0) for i in k]. while heap: v,i,j=heappop. result.append(v). if j+1<len(arr[i]): heappush((arr[i][j+1],i,j+1)).",
      "O(n log k) — each of n elements is pushed/popped once from the k-size heap.",
    ],
  },
  {
    title: "K Most Frequent Elements",
    topic: "Heaps",
    difficulty: "medium",
    day: 23,
    pattern: "Heap / Bucket Sort",
    description:
      "Given an integer array nums and an integer k, return the k most frequent elements.",
    intuition:
      "Count frequencies. Use a min-heap of size k — maintain k elements with highest frequency. Or bucket sort by frequency.",
    approach:
      "Bucket: freq array of size n+1. Count frequencies. Bucket[freq].append(num). Read from highest bucket down until k elements collected.",
    timeComplexity: "O(n) bucket sort",
    spaceComplexity: "O(n)",
    companies: ["Amazon", "Google", "Microsoft"],
    hints: [
      "Count frequencies with a hash map.",
      "Heap approach: use a min-heap of size k. If heap grows beyond k, pop. O(n log k).",
      "Bucket sort approach: index = frequency (max frequency ≤ n). O(n).",
      "bucket = [[] for _ in range(n+1)]. for num, freq in count.items(): bucket[freq].append(num). Read from high to low.",
      "Collect until you have k elements. O(n) time, O(n) space.",
    ],
  },
  {
    title: "Median from Data Stream",
    topic: "Heaps",
    difficulty: "hard",
    day: 23,
    pattern: "Two Heaps",
    description:
      "Design a data structure that supports adding integers from a data stream and finding the median at any time.",
    intuition:
      "Maintain two heaps: a max-heap for the lower half and a min-heap for the upper half. Keep them balanced. Median is the top of one or average of both tops.",
    approach:
      "maxHeap (lower half), minHeap (upper half). Add: push to maxHeap (negate), then push maxHeap top to minHeap. Balance: if len difference > 1, move top of larger to smaller. Median: if equal size, avg of tops; else top of larger heap.",
    timeComplexity: "O(log n) add, O(1) median",
    spaceComplexity: "O(n)",
    companies: ["Amazon", "Google", "Microsoft"],
    hints: [
      "Two heaps partition the data: maxHeap stores lower half, minHeap stores upper half.",
      "Invariant: |maxHeap.size - minHeap.size| <= 1 and maxHeap.top <= minHeap.top.",
      "Add: first balance across heaps, then rebalance sizes.",
      "Add x: push to maxHeap. push maxHeap.pop to minHeap. if minHeap.size > maxHeap.size: push minHeap.pop to maxHeap.",
      "findMedian: if equal size: (maxH.top + minH.top)/2. else: top of larger heap.",
    ],
  },
  {
    title: "Smallest Range Covering Elements from K Lists",
    topic: "Heaps",
    difficulty: "hard",
    day: 23,
    pattern: "Min-Heap + Sliding Window",
    description:
      "You have k lists of sorted integers. Find the smallest range [a, b] such that there is at least one number from each of the k lists.",
    intuition:
      "Min-heap of size k (one from each list). Track the current maximum. Range = [heap.min, current_max]. Advance the list that contributed the minimum to shrink the range.",
    approach:
      "Push first element of each list to heap. Track maxVal. While can pop: [minVal, maxVal] is current range. Update best range. Pop min, push next from same list (update maxVal). If any list exhausted, stop.",
    timeComplexity: "O(n log k) where n=total elements",
    spaceComplexity: "O(k)",
    companies: ["Google", "Amazon"],
    hints: [
      "Min-heap has one element per list. The heap's min + current global max form the current range.",
      "To shrink the range: advance the list with the minimum (replace in heap with next element).",
      "If any list is exhausted, stop (can't cover all k lists).",
      "heap = [(lists[i][0], i, 0) for i in k]. maxVal = max of first elements.",
      "while True: minVal,i,j = heappop. update best range. if j+1 >= len(lists[i]): break. heappush(lists[i][j+1],i,j+1). maxVal=max(maxVal,lists[i][j+1]).",
    ],
  },
  {
    title: "Kth Smallest Element in a Sorted Matrix",
    topic: "Heaps",
    difficulty: "medium",
    day: 23,
    pattern: "Min-Heap / Binary Search",
    description:
      "Given an n×n matrix where each row and column is sorted ascending, return the kth smallest element.",
    intuition:
      "Min-heap: push first row. Pop k-1 times advancing to next in same column. kth pop is answer. Or binary search on value range.",
    approach:
      "minHeap = first column or first row. Pop and push next element from same row. After k pops, return popped value. Binary search: countLessEqual(mid) using staircase search.",
    timeComplexity: "O(k log n) heap, O(n log(max-min)) binary search",
    spaceComplexity: "O(n)",
    companies: ["Amazon", "Google"],
    hints: [
      "Min-heap of (value, row, col). Start with first column. Pop, push next in same row.",
      "After k pops, the popped value is the kth smallest.",
      "Binary search: search on value range [matrix[0][0], matrix[n-1][n-1]]. Count elements <= mid.",
      "countLessEqual(mid): use staircase from top-right corner. O(n).",
      "Binary search approach: lo=matrix[0][0], hi=matrix[n-1][n-1]. while lo<hi: mid=(lo+hi)/2. if count(<=mid)>=k: hi=mid. else lo=mid+1. return lo.",
    ],
  },
  {
    title: "Heap Sort",
    topic: "Heaps",
    difficulty: "medium",
    day: 23,
    pattern: "Heap",
    description:
      "Implement heap sort to sort an array in-place using a max-heap.",
    intuition:
      "Build a max-heap from the array (heapify). Repeatedly extract the max (swap root with last, reduce heap size, heapify down). Result is sorted ascending.",
    approach:
      "Phase 1: build max-heap: for i from n/2-1 to 0: heapify(i). Phase 2: for i from n-1 to 1: swap(0, i); heapify(0) on size i.",
    timeComplexity: "O(n log n)",
    spaceComplexity: "O(1)",
    companies: ["Amazon"],
    hints: [
      "Build max-heap bottom-up: start from last non-leaf (n/2-1) and heapify downward.",
      "Extract max: swap root (max) with last element, reduce heap size, heapify down from root.",
      "Repeat extraction n-1 times.",
      "heapify(arr, n, i): largest=i. l=2i+1, r=2i+2. if l<n and arr[l]>arr[largest]: largest=l. if r<n and arr[r]>arr[largest]: largest=r. if largest!=i: swap, heapify(arr,n,largest).",
      "Build: for i from n//2-1 to 0: heapify(arr,n,i). Sort: for i from n-1 to 1: swap(arr,0,i); heapify(arr,i,0).",
    ],
  },

  // ─── Day 24: Tries ────────────────────────────────────────────────────────
  {
    title: "Word Break Problem",
    topic: "Tries",
    difficulty: "medium",
    day: 24,
    pattern: "DP / Trie",
    description:
      "Given a string s and a dictionary wordDict, return true if s can be segmented into a space-separated sequence of dictionary words.",
    intuition:
      "DP: dp[i] = true if s[0..i-1] can be segmented. dp[i] = any dp[j] where s[j..i-1] is in the dictionary.",
    approach:
      "dp[0]=true. For i from 1 to n: for j from 0 to i: if dp[j] and s[j:i] in wordSet: dp[i]=true. Return dp[n].",
    timeComplexity: "O(n²) DP, O(n*L) with Trie",
    spaceComplexity: "O(n + dict size)",
    companies: ["Amazon", "Google", "Microsoft"],
    hints: [
      "DP: dp[i] = can we segment s[0..i-1] using dictionary words?",
      "dp[i] = OR of (dp[j] AND s[j..i-1] in dict) for all j < i.",
      "Use a set for O(1) word lookup.",
      "dp = [False]*(n+1). dp[0]=True. for i in 1..n: for j in 0..i: if dp[j] and s[j:i] in wordSet: dp[i]=True. return dp[n].",
      "Optimise: only check substrings up to maxWordLength.",
    ],
  },
  {
    title: "Implement a Trie",
    topic: "Tries",
    difficulty: "medium",
    day: 24,
    pattern: "Trie Data Structure",
    description:
      "Implement a trie with insert, search, and startsWith operations.",
    intuition:
      "Trie is a tree where each node represents a character. Each root-to-node path represents a string prefix. Mark end-of-word with a boolean flag.",
    approach:
      "TrieNode: children[26], isEnd. Insert: for each char, create child if not exist, move down. Search: traverse chars, return isEnd at last. StartsWith: traverse chars, return true if all found.",
    timeComplexity: "O(L) per operation where L=word length",
    spaceComplexity: "O(N*L) total",
    companies: ["Amazon", "Google", "Microsoft"],
    hints: [
      "Each node has 26 children (for a-z) and a flag marking end of word.",
      "Insert: traverse characters, create TrieNode if missing, mark isEnd=true at last char.",
      "Search: traverse characters, return false if any missing, return isEnd at last.",
      "StartsWith: like search but return true at last character regardless of isEnd.",
      "class TrieNode: children={}; isEnd=False. Trie: insert, search, startsWith methods.",
    ],
  },
  {
    title: "Longest String with All Prefixes",
    topic: "Tries",
    difficulty: "medium",
    day: 24,
    pattern: "Trie",
    description:
      "Given an array of strings words, find the longest word such that every prefix of that word is also in the array. Return lexicographically smallest if tie.",
    intuition:
      "Build a trie. DFS through the trie: only follow edges where the node is marked as a word end (all prefixes are words). Track the longest (and lexicographically smallest) such path.",
    approach:
      "Insert all words. DFS: at each node, only explore children where isEnd==true (since we need all prefixes to be words). Track max depth (longest word).",
    timeComplexity: "O(N*L)",
    spaceComplexity: "O(N*L)",
    companies: ["Amazon"],
    hints: [
      "Build a trie from all words. Only paths where every node is an end-of-word correspond to valid answers.",
      "DFS: visit child only if child.isEnd is true.",
      "Track current string during DFS, update best when a longer (or same-length but lexicographically smaller) string is found.",
      "Insert all words. dfs from root: only recurse on children where isEnd==true.",
      "Lexicographically smallest tie-break: process children in alphabetical order, update best only when strictly longer.",
    ],
  },
  {
    title: "Implement a Phone Directory",
    topic: "Tries",
    difficulty: "medium",
    day: 24,
    pattern: "Trie",
    description:
      "Given a list of contacts stored in a phone directory and a query string, suggest contacts (from the list) that match each prefix of the query string.",
    intuition:
      "Build a trie with all contacts. For each prefix of the query (as we type character by character), retrieve all words under that trie node. Return up to 3 suggestions.",
    approach:
      "Insert all contacts into trie. For each prefix (query[0..i]): traverse to that trie node. DFS from there to collect up to 3 words. Return suggestions.",
    timeComplexity: "O(N*L + Q*L) where Q=query length",
    spaceComplexity: "O(N*L)",
    companies: ["Amazon", "Microsoft"],
    hints: [
      "Build trie from contacts. For each prefix, DFS from the prefix node.",
      "DFS to collect up to 3 words (alphabetical if trie children are sorted).",
      "For each character typed, traverse one more level in the trie.",
      "If the prefix node doesn't exist, no suggestions for current and all future prefixes.",
      "dfs(node, prefix, results): if isEnd: results.append(prefix). if len(results)==3: return. for c in sorted(children): dfs(children[c], prefix+c, results).",
    ],
  },
  {
    title: "Longest Common Prefix (Trie)",
    topic: "Tries",
    difficulty: "easy",
    day: 24,
    pattern: "Trie",
    description:
      "Find the longest common prefix of an array of strings using a trie.",
    intuition:
      "Build a trie from all strings. Traverse from the root while there is only one child and the node is not an end-of-word — that's the common prefix.",
    approach:
      "Insert all strings. Traverse root: continue while exactly one child and not isEnd. Build prefix string from traversed characters.",
    timeComplexity: "O(N*L)",
    spaceComplexity: "O(N*L)",
    companies: ["Amazon"],
    hints: [
      "Build a trie. The LCP is the path from root until the first branching point or end-of-word.",
      "A node with multiple children means the strings diverge — stop there.",
      "Traverse: while exactly one child and not isEnd: append char, move to child.",
      "Return the accumulated prefix string.",
      "Also solvable without trie: compare first and last string lexicographically; LCP of those two is the overall LCP.",
    ],
  },

  // ─── Day 25: Graphs Part 1 ───────────────────────────────────────────────
  {
    title: "Depth First Search (DFS)",
    topic: "Graphs",
    difficulty: "medium",
    day: 25,
    pattern: "Graph DFS",
    description:
      "Implement DFS traversal of a graph represented as an adjacency list. Return the order of visited vertices.",
    intuition:
      "DFS explores as far as possible along one branch before backtracking. Use a stack (implicit via recursion or explicit) and a visited set.",
    approach:
      "dfs(node, visited, adj): mark visited. For each neighbor: if not visited: dfs(neighbor). Or iterative: stack=[start]. While stack: node=pop. If not visited: mark, for each neighbor push.",
    timeComplexity: "O(V + E)",
    spaceComplexity: "O(V)",
    companies: ["Amazon", "Google", "Microsoft"],
    hints: [
      "Mark visited before or when you first encounter a node to avoid cycles.",
      "Recursive: dfs(node): visited.add(node). for neighbor: if not visited: dfs(neighbor).",
      "Iterative: stack. Push start. While stack: node=pop. if not visited: visit, push all unvisited neighbors.",
      "For disconnected graphs, loop over all nodes and call DFS on unvisited ones.",
      "DFS stack order vs recursion: iterative DFS may visit in different order unless you reverse the neighbor list.",
    ],
  },
  {
    title: "Breadth First Search (BFS)",
    topic: "Graphs",
    difficulty: "medium",
    day: 25,
    pattern: "Graph BFS",
    description:
      "Implement BFS traversal of a graph. Return visited order or shortest path.",
    intuition:
      "BFS uses a queue. Visit all neighbors of the current node before moving deeper. Naturally finds shortest paths in unweighted graphs.",
    approach:
      "queue=[start], visited={start}. While queue: node=dequeue. For each neighbor: if not visited: visit, enqueue, mark visited.",
    timeComplexity: "O(V + E)",
    spaceComplexity: "O(V)",
    companies: ["Amazon", "Google", "Microsoft"],
    hints: [
      "Queue (FIFO) is the key data structure for BFS.",
      "Mark nodes as visited when enqueuing (not when dequeuing) to avoid processing duplicates.",
      "queue=deque([start]). visited={start}. while queue: v=queue.popleft(). for u in adj[v]: if u not in visited: visited.add(u); queue.append(u).",
      "BFS gives shortest path in unweighted graphs (count levels).",
      "For disconnected graphs, loop over all nodes and BFS from unvisited ones.",
    ],
  },
  {
    title: "Detect Cycle in Undirected Graph (BFS)",
    topic: "Graphs",
    difficulty: "medium",
    day: 25,
    pattern: "BFS",
    description:
      "Given an undirected graph, detect if it contains a cycle using BFS.",
    intuition:
      "BFS with parent tracking: if a visited neighbor is not the parent of the current node, a cycle exists.",
    approach:
      "BFS from each unvisited node. Queue stores (node, parent). For each neighbor: if not visited: enqueue with current as parent. If visited and != parent: cycle found.",
    timeComplexity: "O(V + E)",
    spaceComplexity: "O(V)",
    companies: ["Amazon"],
    hints: [
      "Undirected edge A-B: when at A, B is a neighbor and vice versa. So B being visited doesn't mean cycle unless B isn't A's parent.",
      "Track parent of each node. If a neighbor is visited and not parent → cycle.",
      "queue = [(start, -1)]. visited = {start}. while queue: node, parent = dequeue. for neighbor: if not visited: enqueue (neighbor, node). elif neighbor != parent: return True.",
      "Handle disconnected graphs: loop over all nodes.",
      "Return False if no cycle found.",
    ],
  },
  {
    title: "Detect Cycle in Undirected Graph (DFS)",
    topic: "Graphs",
    difficulty: "medium",
    day: 25,
    pattern: "DFS",
    description:
      "Detect a cycle in an undirected graph using DFS.",
    intuition:
      "DFS with parent: if a visited neighbor is encountered that isn't the parent, a back edge (cycle) exists.",
    approach:
      "dfs(node, parent, visited): mark visited. For each neighbor: if not visited: if dfs(neighbor, node): return true. Elif neighbor != parent: return true (cycle). Return false.",
    timeComplexity: "O(V + E)",
    spaceComplexity: "O(V)",
    companies: ["Amazon"],
    hints: [
      "Pass parent in DFS. Back edge to non-parent visited node = cycle.",
      "dfs(u, parent): visited.add(u). for v in adj[u]: if v not in visited: if dfs(v, u): return True. elif v != parent: return True. return False.",
      "For disconnected graphs: loop over all unvisited nodes.",
      "Union-Find is an alternative O(α*n) approach.",
      "Return True as soon as any cycle is found.",
    ],
  },
  {
    title: "Detect Cycle in Directed Graph (DFS)",
    topic: "Graphs",
    difficulty: "medium",
    day: 25,
    pattern: "DFS + Recursion Stack",
    description:
      "Detect a cycle in a directed graph using DFS.",
    intuition:
      "Maintain a recursion stack (inStack). A cycle exists if a visited node in the current recursion stack is encountered (back edge).",
    approach:
      "dfs(node): visited[node]=true, inStack[node]=true. For each neighbor: if not visited: if dfs(neighbor): return true. Elif inStack[neighbor]: return true. inStack[node]=false. Return false.",
    timeComplexity: "O(V + E)",
    spaceComplexity: "O(V)",
    companies: ["Amazon", "Google"],
    hints: [
      "Directed graph: parent tracking doesn't work. Need to track the current DFS path (recursion stack).",
      "If a neighbor is in the current recursion stack (inStack), it's a back edge → cycle.",
      "visited: globally visited. inStack: currently in DFS call stack.",
      "After DFS from a node: inStack[node] = False (backtrack).",
      "dfs(u): visited[u]=inStack[u]=True. for v: if !visited[v]: if dfs(v): True. elif inStack[v]: True. inStack[u]=False. False.",
    ],
  },
  {
    title: "Detect Cycle in Directed Graph (BFS / Kahn's)",
    topic: "Graphs",
    difficulty: "medium",
    day: 25,
    pattern: "Topological Sort / Kahn's",
    description:
      "Detect a cycle in a directed graph using BFS (Kahn's algorithm for topological sort).",
    intuition:
      "If topological sort exists (Kahn's processes all nodes), no cycle. If some nodes remain unprocessed (in-degree never drops to 0), they form a cycle.",
    approach:
      "Compute in-degrees. Queue all 0 in-degree nodes. BFS: pop node, decrement neighbors' in-degrees, enqueue if 0. If total processed < V, cycle exists.",
    timeComplexity: "O(V + E)",
    spaceComplexity: "O(V)",
    companies: ["Amazon", "Google"],
    hints: [
      "Kahn's topological sort: if it processes all V nodes, no cycle. If fewer, cycle detected.",
      "Nodes with 0 in-degree start. Process them, decrement neighbors' in-degrees.",
      "If a neighbor's in-degree reaches 0, enqueue it.",
      "count=0. queue=all with inDeg==0. while queue: v=pop. count++. for u in adj[v]: inDeg[u]--; if 0: enqueue(u). return count < V.",
      "count < V means some nodes couldn't be processed — they're in a cycle.",
    ],
  },

  // ─── Day 26: Graphs Part 2 ───────────────────────────────────────────────
  {
    title: "Topological Sorting (DFS)",
    topic: "Graphs",
    difficulty: "medium",
    day: 26,
    pattern: "DFS + Stack",
    description:
      "Given a directed acyclic graph (DAG), return a topological ordering of its vertices using DFS.",
    intuition:
      "DFS-based: when a node's DFS completes (all descendants processed), push it to a stack. Pop the stack for topological order.",
    approach:
      "visited set, stack. For each unvisited node: dfs(node): for each neighbor: if not visited: dfs(neighbor). stack.push(node). Result = pop all from stack.",
    timeComplexity: "O(V + E)",
    spaceComplexity: "O(V)",
    companies: ["Amazon", "Google"],
    hints: [
      "Post-order DFS: node is pushed to result AFTER all its descendants are processed.",
      "Reverse the DFS finish order to get topological order.",
      "dfs(u): visited.add(u). for v in adj[u]: if v not in visited: dfs(v). stack.append(u).",
      "Call dfs for each unvisited node. Result is reverse of finish order (or pop from stack).",
      "Only works on DAGs. Use cycle detection first if graph might have cycles.",
    ],
  },
  {
    title: "Flood Fill Algorithm",
    topic: "Graphs",
    difficulty: "easy",
    day: 26,
    pattern: "DFS/BFS on Grid",
    description:
      "Given an image (2D grid), a starting pixel, and a new color, flood fill the image — change the color of the starting pixel and all connected pixels of the same original color.",
    intuition:
      "DFS/BFS from the starting pixel. If a neighbor has the same original color, color it and recurse/enqueue.",
    approach:
      "originalColor = image[sr][sc]. If originalColor == newColor return. dfs(r, c): if out of bounds or color != originalColor: return. image[r][c] = newColor. Recurse 4 directions.",
    timeComplexity: "O(m*n)",
    spaceComplexity: "O(m*n)",
    companies: ["Amazon", "Microsoft"],
    hints: [
      "DFS from (sr, sc). Change color, recurse on 4 neighbors with same original color.",
      "Edge case: if original color == new color, no change needed.",
      "Mark cells by changing their color (no separate visited array needed since new color != old color).",
      "dfs(r,c): if oob or image[r][c]!=orig: return. image[r][c]=new. dfs(4 dirs).",
      "BFS alternative: queue of positions, same logic.",
    ],
  },
  {
    title: "Topological Sorting (BFS / Kahn's)",
    topic: "Graphs",
    difficulty: "medium",
    day: 26,
    pattern: "Kahn's Algorithm",
    description:
      "Perform topological sort of a DAG using BFS (Kahn's algorithm).",
    intuition:
      "Process nodes with 0 in-degree first. As you remove a node, decrement in-degrees of its successors. Newly 0 in-degree nodes join the queue.",
    approach:
      "Compute in-degrees. Queue all 0 in-degree. While queue: pop node, add to result. For each successor: in-degree--. If 0, enqueue. If result.size < V, cycle exists.",
    timeComplexity: "O(V + E)",
    spaceComplexity: "O(V)",
    companies: ["Amazon", "Google"],
    hints: [
      "Kahn's: process nodes with in-degree 0. Update neighbors when removing a node.",
      "Naturally detects cycles: if processed count < V, a cycle exists.",
      "inDeg=compute. queue=all with inDeg==0. while queue: u=pop. result.append(u). for v in adj[u]: inDeg[v]--; if 0: queue.append(v).",
      "Result is the topological order.",
      "Multiple valid orderings possible — Kahn's gives one based on the queue order.",
    ],
  },
  {
    title: "Course Schedule II",
    topic: "Graphs",
    difficulty: "medium",
    day: 26,
    pattern: "Topological Sort",
    description:
      "Given n courses and prerequisite pairs, return a valid order to finish all courses. If impossible, return an empty array.",
    intuition:
      "Model as a DAG: prerequisites are directed edges. Topological sort gives a valid course order. If a cycle exists, return [].",
    approach:
      "Build adjacency list and in-degree array. Kahn's BFS: enqueue 0 in-degree. Pop, add to order. Decrement neighbors. If order.size == n: return order. Else return [].",
    timeComplexity: "O(V + E)",
    spaceComplexity: "O(V + E)",
    companies: ["Amazon", "Google", "Microsoft"],
    hints: [
      "Build a directed graph: prerequisite[a,b] means b→a (b must come before a).",
      "Topological sort of the graph gives the course order.",
      "Cycle means it's impossible — Kahn's: if processed < n, cycle exists, return [].",
      "Build adj, inDeg. Kahn's BFS. If len(order)==n: return order. else: [].",
      "Same as topological sort with cycle detection.",
    ],
  },
  {
    title: "Cheapest Flights Within K Stops",
    topic: "Graphs",
    difficulty: "medium",
    day: 26,
    pattern: "Bellman-Ford / Modified Dijkstra",
    description:
      "Given n cities, flight connections with prices, a source, destination, and max k stops, find the cheapest price to fly from source to destination with at most k stops.",
    intuition:
      "Bellman-Ford with k+1 iterations: relax edges at most k+1 times (k stops = k+1 edges). Use a copy of distances array to ensure we count edges correctly.",
    approach:
      "dist=[INF]*n, dist[src]=0. For i in 0..k: temp=dist.copy(). For each edge (u,v,price): if dist[u]+price < temp[v]: temp[v]=dist[u]+price. dist=temp. Return dist[dst] if < INF.",
    timeComplexity: "O(k * E)",
    spaceComplexity: "O(n)",
    companies: ["Amazon", "Google"],
    hints: [
      "Standard Dijkstra doesn't handle the k-stops constraint well. Use modified Bellman-Ford.",
      "Run exactly k+1 relaxations (k stops = k+1 edges).",
      "Use a copy of the distance array each iteration to prevent using multiple edges in one step.",
      "dist = [INF]*n. dist[src]=0. for _ in range(k+1): temp=dist.copy(). for u,v,w in flights: if dist[u]+w < temp[v]: temp[v]=dist[u]+w. dist=temp.",
      "Return dist[dst] if != INF else -1.",
    ],
  },
  {
    title: "Dijkstra's Algorithm",
    topic: "Graphs",
    difficulty: "hard",
    day: 26,
    pattern: "Greedy + Min-Heap",
    description:
      "Given a weighted directed graph, find the shortest paths from a source vertex to all other vertices using Dijkstra's algorithm.",
    intuition:
      "Greedily process the unvisited vertex with minimum distance. Use a min-heap for efficiency. Relax neighbors: if current path + edge weight < known distance, update.",
    approach:
      "dist=[INF]*n, dist[src]=0. minHeap=[(0, src)]. While heap: d, u = pop. If d > dist[u]: skip. For each (v, w): if dist[u]+w < dist[v]: dist[v]=dist[u]+w; push (dist[v], v).",
    timeComplexity: "O((V + E) log V)",
    spaceComplexity: "O(V + E)",
    companies: ["Amazon", "Google", "Microsoft"],
    hints: [
      "Greedy: always process the vertex with the smallest known distance next.",
      "Min-heap of (distance, vertex) for O(log V) extraction.",
      "Lazy deletion: if popped distance > dist[v], skip (stale entry).",
      "dist[src]=0. heap=[(0,src)]. while heap: d,u=heappop. if d>dist[u]: continue. for v,w in adj[u]: if dist[u]+w<dist[v]: dist[v]=...; heappush((dist[v],v)).",
      "Doesn't work with negative edge weights. Use Bellman-Ford for negative edges.",
    ],
  },

  // ─── Day 27: Graphs Part 3 ───────────────────────────────────────────────
  {
    title: "Kruskal's Algorithm (MST)",
    topic: "Graphs",
    difficulty: "hard",
    day: 27,
    pattern: "Greedy + Union-Find",
    description:
      "Find the Minimum Spanning Tree of a connected undirected weighted graph using Kruskal's algorithm.",
    intuition:
      "Sort all edges by weight. Add each edge to MST if it doesn't form a cycle (checked with Union-Find). Stop after V-1 edges.",
    approach:
      "Sort edges by weight. Union-Find for cycle detection. For each edge: if find(u) != find(v): add to MST, union(u,v), edgeCount++. Stop when edgeCount == V-1.",
    timeComplexity: "O(E log E)",
    spaceComplexity: "O(V)",
    companies: ["Amazon"],
    hints: [
      "Greedy: smallest weight edges first. Add if doesn't create a cycle.",
      "Union-Find (disjoint set) checks cycle in O(α) amortised.",
      "Sort edges. for u,v,w in edges: if find(u)!=find(v): mst.append((u,v,w)); union(u,v); if edges==V-1: break.",
      "Total MST weight = sum of selected edge weights.",
      "Union by rank + path compression for efficient Union-Find.",
    ],
  },
  {
    title: "Prim's Algorithm (MST)",
    topic: "Graphs",
    difficulty: "hard",
    day: 27,
    pattern: "Greedy + Min-Heap",
    description:
      "Find the Minimum Spanning Tree of a connected undirected weighted graph using Prim's algorithm.",
    intuition:
      "Grow the MST from an arbitrary start vertex. At each step, add the cheapest edge connecting the MST to a non-MST vertex. Use a min-heap.",
    approach:
      "visited=set. heap=[(0, start, -1)]. While heap and len(visited)<V: w, u, parent = pop. If u visited: skip. Add u to visited, record edge. Push all unvisited neighbors with their weights.",
    timeComplexity: "O((V + E) log V)",
    spaceComplexity: "O(V + E)",
    companies: ["Amazon"],
    hints: [
      "Prim's is similar to Dijkstra but tracks minimum edge weight to reach each vertex from the MST.",
      "Min-heap: (edge_weight, vertex, from_vertex). Pop cheapest edge to unvisited vertex.",
      "visited prevents adding a vertex twice.",
      "heap=[(0,start,None)]. visited=set. while heap: w,u,parent=heappop. if u in visited: skip. visited.add(u). mstWeight+=w. for v,wt in adj[u]: if v not visited: heappush((wt,v,u)).",
      "Total cost = sum of all popped weights.",
    ],
  },
  {
    title: "Rotting Oranges",
    topic: "Graphs",
    difficulty: "medium",
    day: 27,
    pattern: "Multi-source BFS",
    description:
      "Same as Day 15 Rotten Oranges — multi-source BFS on grid.",
    intuition:
      "All initially rotten oranges spread simultaneously — model as multi-source BFS. Each BFS level = 1 minute.",
    approach:
      "Same solution as Day 15. Queue all rotten, BFS level by level, count minutes.",
    timeComplexity: "O(m*n)",
    spaceComplexity: "O(m*n)",
    companies: ["Amazon", "Microsoft"],
    hints: [
      "Multi-source BFS: start from all rotten oranges at once.",
      "BFS level = 1 minute. Count levels.",
      "If any fresh orange remains, return -1.",
      "queue=all 2s. freshCount=all 1s. while queue: time++. for each in level: spread to fresh neighbors.",
      "return time if freshCount==0 else -1.",
    ],
  },
  {
    title: "Clone a Graph",
    topic: "Graphs",
    difficulty: "medium",
    day: 27,
    pattern: "BFS/DFS + Hash Map",
    description:
      "Given a reference to a node in a connected undirected graph, return a deep copy of the graph.",
    intuition:
      "BFS/DFS: maintain a map from original nodes to their clones. For each original node, create a clone and clone its neighbors (using the map to avoid duplicates).",
    approach:
      "map={}. dfs(node): if node in map: return map[node]. clone=Node(val). map[node]=clone. For each neighbor: clone.neighbors.append(dfs(neighbor)). Return clone.",
    timeComplexity: "O(V + E)",
    spaceComplexity: "O(V)",
    companies: ["Amazon", "Google"],
    hints: [
      "Map from original node to its clone prevents infinite loops and duplicates.",
      "DFS: create clone, add to map, then clone all neighbors.",
      "Create clone BEFORE recursing on neighbors (so map[node] is set when neighbors recurse back).",
      "dfs(node): if node in map: return map[node]. clone=Node(node.val). map[node]=clone. for n in node.neighbors: clone.neighbors.append(dfs(n)). return clone.",
      "BFS alternative: queue, same map-based approach.",
    ],
  },
  {
    title: "Floyd-Warshall Algorithm",
    topic: "Graphs",
    difficulty: "hard",
    day: 27,
    pattern: "Dynamic Programming on Graph",
    description:
      "Find shortest paths between all pairs of vertices in a weighted graph (may have negative edges, no negative cycles).",
    intuition:
      "dp[i][j][k] = shortest path from i to j using only vertices 0..k as intermediates. dp[i][j][k] = min(dp[i][j][k-1], dp[i][k][k-1] + dp[k][j][k-1]).",
    approach:
      "dist[i][j] = weight or INF. For k in 0..V: for i: for j: dist[i][j] = min(dist[i][j], dist[i][k]+dist[k][j]).",
    timeComplexity: "O(V³)",
    spaceComplexity: "O(V²)",
    companies: ["Amazon"],
    hints: [
      "Try every vertex as an intermediate on every pair's path.",
      "dist[i][j] = min(current best, go through k). Three nested loops over V.",
      "Init: dist[i][i]=0. dist[i][j]=edge weight or INF. Then run DP.",
      "Detect negative cycles: if dist[i][i] < 0 for any i after running DP.",
      "for k in 0..V: for i: for j: dist[i][j]=min(dist[i][j], dist[i][k]+dist[k][j]).",
    ],
  },
  {
    title: "Bellman-Ford Algorithm",
    topic: "Graphs",
    difficulty: "hard",
    day: 27,
    pattern: "Dynamic Programming",
    description:
      "Find shortest paths from a source vertex to all vertices in a weighted graph, handling negative edge weights. Detect negative cycles.",
    intuition:
      "Relax all edges V-1 times. After V-1 iterations, if any edge can still be relaxed, a negative cycle exists.",
    approach:
      "dist=[INF]*V, dist[src]=0. For i in 0..V-2: for each edge (u,v,w): if dist[u]+w<dist[v]: dist[v]=dist[u]+w. After, check for negative cycles: if any edge still relaxable, cycle exists.",
    timeComplexity: "O(V*E)",
    spaceComplexity: "O(V)",
    companies: ["Amazon", "Google"],
    hints: [
      "Relax all edges V-1 times (shortest path has at most V-1 edges).",
      "After V-1 iterations, a Vth relaxation indicates a negative cycle.",
      "dist[src]=0, rest INF. for _ in range(V-1): for each edge u,v,w: if dist[u]+w<dist[v]: relax.",
      "Negative cycle check: one more pass of relaxations — if anything updates, negative cycle.",
      "Handles negative edges (unlike Dijkstra) but O(VE) is slower.",
    ],
  },
  {
    title: "01 Matrix",
    topic: "Graphs",
    difficulty: "medium",
    day: 27,
    pattern: "Multi-source BFS",
    description:
      "Given a binary matrix, find the distance of the nearest 0 for each cell.",
    intuition:
      "Multi-source BFS starting from all 0-cells simultaneously. Distance grows as BFS expands.",
    approach:
      "Queue all 0-cells with distance 0. BFS: for each cell, expand to 4 neighbors. Set their distance to current+1 if not yet set.",
    timeComplexity: "O(m*n)",
    spaceComplexity: "O(m*n)",
    companies: ["Amazon", "Microsoft"],
    hints: [
      "Start BFS from all 0-cells simultaneously. Each BFS level adds 1 to distance.",
      "dist matrix: 0 for all 0-cells, INF for all 1-cells initially.",
      "BFS: when you reach a 1-cell from a 0-cell, its distance = 1. Continue expanding.",
      "No re-visiting: once distance is set, don't update.",
      "queue=all 0-positions. dist=0 for 0s, INF for 1s. BFS: if dist[neighbor]==INF: dist[neighbor]=dist[curr]+1; enqueue.",
    ],
  },

  // ─── Day 28: Graphs Part 4 ───────────────────────────────────────────────
  {
    title: "Number of Islands",
    topic: "Graphs",
    difficulty: "medium",
    day: 28,
    pattern: "DFS/BFS on Grid",
    description:
      "Given a 2D grid of '1's (land) and '0's (water), count the number of islands. An island is surrounded by water and formed by connecting adjacent lands.",
    intuition:
      "DFS/BFS from each unvisited land cell. Mark all connected land cells as visited. Each DFS/BFS call = one island.",
    approach:
      "For each cell: if '1' and unvisited: count++, DFS to mark all connected '1's as visited. Return count.",
    timeComplexity: "O(m*n)",
    spaceComplexity: "O(m*n)",
    companies: ["Amazon", "Google", "Microsoft"],
    hints: [
      "DFS from each unvisited '1'. Mark all connected land as visited ('0' or separate array).",
      "Each DFS invocation counts as one island.",
      "for r,c in grid: if grid[r][c]=='1': count++; dfs(r,c). dfs: if oob or grid[r][c]!='1': return. grid[r][c]='0'. dfs 4 dirs.",
      "Count = number of DFS/BFS calls from main loop.",
      "Union-Find alternative groups connected cells efficiently.",
    ],
  },
  {
    title: "Is Graph Bipartite?",
    topic: "Graphs",
    difficulty: "medium",
    day: 28,
    pattern: "BFS/DFS Graph Coloring",
    description:
      "Given an undirected graph, determine if it is bipartite — i.e., if vertices can be split into two groups such that no two adjacent vertices are in the same group.",
    intuition:
      "2-color the graph using BFS/DFS. If any two adjacent vertices have the same color, it's not bipartite. If the graph has an odd cycle, it's not bipartite.",
    approach:
      "BFS: for each uncolored node: color=0, queue=[node]. For each neighbor: if not colored: color opposite. If already same color: return false. Return true.",
    timeComplexity: "O(V + E)",
    spaceComplexity: "O(V)",
    companies: ["Amazon", "Google"],
    hints: [
      "Try to 2-color the graph (like bipartite check). If any conflict, not bipartite.",
      "BFS: assign color 0 to start. Neighbors get color 1. Their neighbors get 0. Etc.",
      "If a neighbor already has the same color as current, not bipartite.",
      "color=[-1]*V. for each node: if color[node]==-1: BFS with 2-coloring. if conflict: return False.",
      "Works for disconnected graphs: loop over all components.",
    ],
  },
  {
    title: "Strongly Connected Components (Kosaraju's)",
    topic: "Graphs",
    difficulty: "hard",
    day: 28,
    pattern: "DFS + Transpose Graph",
    description:
      "Find all strongly connected components (SCCs) in a directed graph using Kosaraju's algorithm.",
    intuition:
      "Two-pass DFS: Pass 1 on original graph, push nodes to stack in finish order. Pass 2 on transposed graph in stack order — each DFS tree is an SCC.",
    approach:
      "Pass 1: DFS on original, push to stack on finish. Pass 2: transpose graph. Pop stack, DFS on transposed from that node — each DFS tree = one SCC.",
    timeComplexity: "O(V + E)",
    spaceComplexity: "O(V + E)",
    companies: ["Amazon"],
    hints: [
      "Strongly connected: every vertex reachable from every other in the component.",
      "Pass 1: DFS on original graph, fill a stack with finish times.",
      "Pass 2: reverse the graph. Pop from stack, DFS on reversed graph — each DFS finds one SCC.",
      "Transpose graph reverses all edges. DFS on transposed from high-finish-time nodes finds SCCs.",
      "Alternative: Tarjan's algorithm (single DFS, uses lowlink values).",
    ],
  },
  {
    title: "Most Stones Removed with Same Row or Column",
    topic: "Graphs",
    difficulty: "medium",
    day: 28,
    pattern: "Union-Find / DFS",
    description:
      "Stones are placed at integer coordinates. A stone can be removed if it shares a row or column with another stone. Return the maximum number of stones that can be removed.",
    intuition:
      "Stones in the same row or column are connected. Groups of connected stones: you can remove all but one from each group. Answer = total stones − number of groups.",
    approach:
      "Union-Find: for each pair of stones sharing row or column, union them. Or DFS grouping. Answer = n - number of distinct components.",
    timeComplexity: "O(n² α(n)) with Union-Find",
    spaceComplexity: "O(n)",
    companies: ["Amazon"],
    hints: [
      "Stones in the same row or column are in the same group (transitively).",
      "From each group of k stones, k-1 can be removed.",
      "Answer = n - (number of connected components).",
      "Union-Find: union stones sharing same row or column. Count components.",
      "DFS: build adjacency list (edge if same row or col). DFS to count components.",
    ],
  },
  {
    title: "Number of Ways to Arrive at Destination",
    topic: "Graphs",
    difficulty: "medium",
    day: 28,
    pattern: "Dijkstra + DP",
    description:
      "Given a directed weighted graph, find the number of paths from node 0 to node n-1 with the minimum time. Return the answer mod 10^9+7.",
    intuition:
      "Modified Dijkstra: track both minimum distance and count of ways to achieve that minimum distance. When a shorter path is found, reset count. When an equal path is found, add count.",
    approach:
      "dist=[INF]*n, dist[0]=0, ways=[0]*n, ways[0]=1. Min-heap. When visiting (d, u): if d < dist[v] via u: update dist[v], ways[v]=ways[u]. If d == dist[v] via u: ways[v]+=ways[u].",
    timeComplexity: "O((V+E) log V)",
    spaceComplexity: "O(V)",
    companies: ["Amazon"],
    hints: [
      "Dijkstra for shortest path. Additionally track ways[v] = number of shortest paths to v.",
      "When we find a new shortest path to v: ways[v] = ways[u].",
      "When we find an equal-length path to v: ways[v] += ways[u].",
      "ways[0]=1. For each relaxation: if shorter: dist[v]=new; ways[v]=ways[u]. if equal: ways[v]+=ways[u].",
      "Return ways[n-1] % MOD.",
    ],
  },
  {
    title: "Number of Provinces",
    topic: "Graphs",
    difficulty: "medium",
    day: 28,
    pattern: "DFS/BFS / Union-Find",
    description:
      "Given an n×n adjacency matrix, find the number of provinces (connected components of cities).",
    intuition:
      "DFS/BFS from each unvisited city marks all cities in its province. Count DFS calls = number of provinces.",
    approach:
      "visited=set. For each city: if not visited: count++, dfs(city). dfs marks all directly/indirectly connected cities as visited.",
    timeComplexity: "O(n²)",
    spaceComplexity: "O(n)",
    companies: ["Amazon"],
    hints: [
      "Standard connected components problem using the adjacency matrix.",
      "DFS/BFS from each unvisited node. Each component = one province.",
      "visited=[False]*n. for i in 0..n-1: if !visited[i]: count++; dfs(i). return count.",
      "dfs(i): visited[i]=True. for j in 0..n-1: if adj[i][j]==1 and !visited[j]: dfs(j).",
      "Union-Find: union connected cities. Count distinct roots.",
    ],
  },
  {
    title: "Alien Dictionary",
    topic: "Graphs",
    difficulty: "hard",
    day: 28,
    pattern: "Topological Sort",
    description:
      "Given a sorted list of words from an alien language, determine the order of characters in the alien alphabet. Return the characters in order, or empty string if invalid.",
    intuition:
      "Compare adjacent words to find character ordering constraints (edges). Build a directed graph of these constraints and topological sort to find the character order.",
    approach:
      "Compare adjacent word pairs: first differing character gives an edge u→v. Build graph. Topological sort (BFS Kahn's). If cycle (processed < total unique chars): return ''. Else return order.",
    timeComplexity: "O(C) where C = total chars across all words",
    spaceComplexity: "O(1) — only 26 chars",
    companies: ["Amazon", "Google", "Microsoft"],
    hints: [
      "Compare adjacent pairs of words. First differing character gives an ordering constraint.",
      "Edge u→v means u comes before v in alien alphabet.",
      "Build adjacency list and in-degree for unique characters. Topological sort.",
      "Edge case: if word2 is a prefix of word1 and len(word1) > len(word2), invalid → return ''.",
      "Kahn's BFS topological sort. If all unique chars processed → valid order. Else cycle → ''.",
    ],
  },

  // ─── Day 29: DP Part 1 ───────────────────────────────────────────────────
  {
    title: "0-1 Knapsack",
    topic: "Dynamic Programming",
    difficulty: "medium",
    day: 29,
    pattern: "2D DP",
    description:
      "Given weights and values of n items, and a knapsack of capacity W, find the maximum value you can achieve by picking items such that total weight ≤ W. Each item can be used at most once.",
    intuition:
      "dp[i][w] = max value using first i items with capacity w. Either skip item i or take it (if weight[i] <= w).",
    approach:
      "dp[i][w] = max(dp[i-1][w], dp[i-1][w-weight[i]] + value[i]) if weight[i] <= w else dp[i-1][w]. Fill table, return dp[n][W].",
    timeComplexity: "O(n*W)",
    spaceComplexity: "O(n*W), optimisable to O(W)",
    companies: ["Amazon", "Google"],
    hints: [
      "State: dp[i][w] = max value with first i items, capacity w.",
      "Transition: skip item i (dp[i-1][w]) or take it (dp[i-1][w-wi]+vi) if wi<=w.",
      "Build table bottom-up. Return dp[n][W].",
      "Space optimisation: 1D dp[w]. Iterate w from W down to weight[i] (to prevent reuse).",
      "1D: for each item: for w from W down to weight[i]: dp[w]=max(dp[w], dp[w-weight[i]]+value[i]).",
    ],
  },
  {
    title: "Buy and Sell Stock I (DP)",
    topic: "Dynamic Programming",
    difficulty: "easy",
    day: 29,
    pattern: "DP / Greedy",
    description:
      "Same as Day 1 Stock Buy & Sell — find maximum profit from one transaction.",
    intuition:
      "Track minimum price seen so far. Profit on each day = price - minSoFar. Track max profit.",
    approach:
      "minPrice=INF, maxProfit=0. for p in prices: minPrice=min(minPrice,p). maxProfit=max(maxProfit, p-minPrice). Return maxProfit.",
    timeComplexity: "O(n)",
    spaceComplexity: "O(1)",
    companies: ["Amazon", "Google"],
    hints: [
      "DP: dp[i] = max profit up to day i. dp[i] = max(dp[i-1], prices[i] - minSoFar).",
      "Equivalent to greedy: track min price so far.",
      "Single pass. minPrice=prices[0], maxProfit=0.",
      "maxProfit = max(maxProfit, price - minPrice) at each step.",
      "Same as the stock problem from Day 1.",
    ],
  },
  {
    title: "Target Sum (Subset Sum)",
    topic: "Dynamic Programming",
    difficulty: "medium",
    day: 29,
    pattern: "Subset Sum DP",
    description:
      "Given a set of non-negative integers and a target, determine if there is a subset with sum equal to the target.",
    intuition:
      "dp[i][s] = true if subset of first i elements sums to s. Either include element i or exclude.",
    approach:
      "dp[0][0]=true. For each num: for s from target to num: dp[s] = dp[s] OR dp[s-num]. Return dp[target].",
    timeComplexity: "O(n * target)",
    spaceComplexity: "O(target)",
    companies: ["Amazon", "Microsoft"],
    hints: [
      "dp[s] = can we make sum s from elements seen so far.",
      "1D DP: iterate sums from target down to num (prevents reuse of same element).",
      "dp=[False]*(target+1). dp[0]=True. for num: for s from target to num: dp[s]|=dp[s-num].",
      "Return dp[target].",
      "Standard 0/1 knapsack variant with boolean DP.",
    ],
  },
  {
    title: "Coin Change",
    topic: "Dynamic Programming",
    difficulty: "medium",
    day: 29,
    pattern: "Unbounded Knapsack DP",
    description:
      "Given an array of coin denominations and an amount, find the fewest number of coins needed to make up that amount. If impossible, return -1.",
    intuition:
      "dp[amount] = minimum coins. dp[0]=0. For each coin, update dp[a] = min(dp[a], dp[a-coin]+1). Coins can be reused (unbounded).",
    approach:
      "dp=[INF]*(amount+1), dp[0]=0. For a in 1..amount: for each coin: if a>=coin and dp[a-coin]!=INF: dp[a]=min(dp[a], dp[a-coin]+1). Return dp[amount] if !=INF else -1.",
    timeComplexity: "O(amount * n)",
    spaceComplexity: "O(amount)",
    companies: ["Amazon", "Google", "Microsoft"],
    hints: [
      "Unbounded knapsack: each coin can be used multiple times.",
      "dp[a] = min coins to make amount a.",
      "dp[0]=0. for a=1..amount: for coin in coins: if a>=coin: dp[a]=min(dp[a], dp[a-coin]+1).",
      "Inner loop order doesn't matter for unbounded (unlike 0/1 knapsack).",
      "Return dp[amount] if < INF else -1.",
    ],
  },
  {
    title: "Unbounded Knapsack",
    topic: "Dynamic Programming",
    difficulty: "medium",
    day: 29,
    pattern: "DP",
    description:
      "Given weights and values of items, and a knapsack capacity W, find maximum value where each item can be used unlimited times.",
    intuition:
      "dp[w] = max value for capacity w. For each weight, iterate from w upwards (unlike 0/1 which iterates downward — allowing reuse).",
    approach:
      "dp=[0]*(W+1). For w in 1..W: for each item: if weight[i]<=w: dp[w]=max(dp[w], dp[w-weight[i]]+value[i]). Return dp[W].",
    timeComplexity: "O(n*W)",
    spaceComplexity: "O(W)",
    companies: ["Amazon"],
    hints: [
      "Difference from 0/1 knapsack: each item can be used unlimited times.",
      "Iterate w from 0 to W (not W to 0). Using the same item multiple times is thus possible.",
      "dp[w] = max(dp[w], dp[w-wi]+vi) for each item with wi<=w.",
      "Or: outer loop over items, inner over weights 0..W.",
      "Coin change is a special case of unbounded knapsack.",
    ],
  },

  // ─── Day 30: DP Part 2 ───────────────────────────────────────────────────
  {
    title: "Longest Common Substring",
    topic: "Dynamic Programming",
    difficulty: "medium",
    day: 30,
    pattern: "2D DP",
    description:
      "Given two strings, find the length of the longest common substring (contiguous).",
    intuition:
      "dp[i][j] = length of longest common substring ending at s1[i-1] and s2[j-1]. If chars match: dp[i][j]=dp[i-1][j-1]+1. Track max.",
    approach:
      "dp[i][j]: if s1[i-1]==s2[j-1]: dp[i][j]=dp[i-1][j-1]+1; maxLen=max(maxLen,dp[i][j]). Else dp[i][j]=0. Return maxLen.",
    timeComplexity: "O(m*n)",
    spaceComplexity: "O(m*n), optimisable to O(min(m,n))",
    companies: ["Amazon"],
    hints: [
      "Unlike LCS, substring must be contiguous → reset to 0 on mismatch.",
      "dp[i][j] = length of longest common suffix of s1[0..i-1] and s2[0..j-1].",
      "if s1[i-1]==s2[j-1]: dp[i][j]=dp[i-1][j-1]+1. else: dp[i][j]=0.",
      "Track global max across all dp[i][j] values.",
      "Space optimise: only need previous row → O(n).",
    ],
  },
  {
    title: "Longest Common Subsequence",
    topic: "Dynamic Programming",
    difficulty: "medium",
    day: 30,
    pattern: "2D DP",
    description:
      "Given two strings s1 and s2, find the length of their longest common subsequence (not necessarily contiguous).",
    intuition:
      "dp[i][j] = LCS length of s1[0..i-1] and s2[0..j-1]. If chars match: dp[i-1][j-1]+1. Else max(dp[i-1][j], dp[i][j-1]).",
    approach:
      "dp[i][j]: if s1[i-1]==s2[j-1]: dp[i-1][j-1]+1. Else max(dp[i-1][j], dp[i][j-1]). Return dp[m][n].",
    timeComplexity: "O(m*n)",
    spaceComplexity: "O(m*n)",
    companies: ["Amazon", "Google", "Microsoft"],
    hints: [
      "Subsequence: chars don't need to be contiguous.",
      "dp[i][j]: if match → dp[i-1][j-1]+1. else → max(dp[i-1][j], dp[i][j-1]).",
      "Base case: dp[0][j]=dp[i][0]=0 (empty string has LCS 0).",
      "Fill row by row. Return dp[m][n].",
      "Space optimise: O(min(m,n)) using two rows.",
    ],
  },
  {
    title: "Longest Increasing Subsequence",
    topic: "Dynamic Programming",
    difficulty: "medium",
    day: 30,
    pattern: "DP / Binary Search",
    description:
      "Given an integer array, find the length of the longest strictly increasing subsequence.",
    intuition:
      "dp[i] = length of LIS ending at index i. dp[i] = 1 + max(dp[j]) for all j<i where nums[j]<nums[i]. Patience sorting (binary search approach) achieves O(n log n).",
    approach:
      "Binary search approach: maintain tails array. For each num: binary search for first tail >= num. Replace or append. tails.length = LIS length.",
    timeComplexity: "O(n log n)",
    spaceComplexity: "O(n)",
    companies: ["Amazon", "Google", "Microsoft"],
    hints: [
      "DP approach: dp[i] = 1 + max(dp[j] for j<i where nums[j]<nums[i]). O(n²).",
      "O(n log n): maintain 'tails' — smallest ending element of each increasing subsequence of each length.",
      "For each num: binary search in tails for the first element >= num. Replace it (or append if all smaller).",
      "tails length = LIS length.",
      "tails=[]. for num: pos=bisect_left(tails, num). if pos==len(tails): tails.append(num). else: tails[pos]=num. return len(tails).",
    ],
  },
  {
    title: "Edit Distance",
    topic: "Dynamic Programming",
    difficulty: "medium",
    day: 30,
    pattern: "2D DP",
    description:
      "Given two strings word1 and word2, return the minimum number of operations (insert, delete, replace) to convert word1 to word2.",
    intuition:
      "dp[i][j] = min edits to convert word1[0..i-1] to word2[0..j-1]. If chars match: dp[i-1][j-1]. Else 1 + min(insert, delete, replace).",
    approach:
      "dp[i][j]: if word1[i-1]==word2[j-1]: dp[i-1][j-1]. Else 1+min(dp[i-1][j], dp[i][j-1], dp[i-1][j-1]). Base: dp[i][0]=i, dp[0][j]=j.",
    timeComplexity: "O(m*n)",
    spaceComplexity: "O(m*n)",
    companies: ["Amazon", "Google", "Microsoft"],
    hints: [
      "dp[i][j] = edit distance between word1[0..i-1] and word2[0..j-1].",
      "Base cases: dp[i][0]=i (delete all), dp[0][j]=j (insert all).",
      "If word1[i-1]==word2[j-1]: dp[i][j]=dp[i-1][j-1]. No edit needed.",
      "Else: dp[i][j]=1+min(dp[i-1][j] delete, dp[i][j-1] insert, dp[i-1][j-1] replace).",
      "Fill top-left to bottom-right. Return dp[m][n].",
    ],
  },
  {
    title: "Longest Palindromic Subsequence",
    topic: "Dynamic Programming",
    difficulty: "medium",
    day: 30,
    pattern: "2D DP",
    description:
      "Given a string s, find the length of the longest palindromic subsequence.",
    intuition:
      "LPS(s) = LCS(s, reverse(s)). Or directly: dp[i][j] = LPS of s[i..j]. If s[i]==s[j]: dp[i-1][j-1]+2. Else max(dp[i+1][j], dp[i][j-1]).",
    approach:
      "dp[i][j]: if i==j: 1. If s[i]==s[j]: 2+dp[i+1][j-1]. Else max(dp[i+1][j], dp[i][j-1]). Fill diagonally. Return dp[0][n-1].",
    timeComplexity: "O(n²)",
    spaceComplexity: "O(n²)",
    companies: ["Amazon"],
    hints: [
      "LPS = LCS of s and its reverse.",
      "Or directly: dp[i][j] = longest palindromic subsequence of s[i..j].",
      "if s[i]==s[j]: dp[i][j]=2+dp[i+1][j-1]. else: max(dp[i+1][j], dp[i][j-1]).",
      "Base: dp[i][i]=1. Fill by increasing substring length.",
      "return dp[0][n-1].",
    ],
  },
  {
    title: "Buy and Sell Stock II",
    topic: "Dynamic Programming",
    difficulty: "medium",
    day: 30,
    pattern: "Greedy / DP",
    description:
      "Given daily stock prices, you may complete as many transactions as you like (buy and sell one share at a time). Find maximum profit.",
    intuition:
      "Greedy: add every upward price difference. Whenever prices[i] > prices[i-1], add the difference (as if you bought and sold each day with profit).",
    approach:
      "profit=0. For i from 1 to n-1: if prices[i]>prices[i-1]: profit+=prices[i]-prices[i-1]. Return profit.",
    timeComplexity: "O(n)",
    spaceComplexity: "O(1)",
    companies: ["Amazon", "Google"],
    hints: [
      "You can buy/sell on the same day. Greedy: capture every upward move.",
      "profit += max(0, prices[i] - prices[i-1]) for all i.",
      "Equivalent to buying and selling every day that's profitable.",
      "No cooldown, no transaction limit → pure greedy.",
      "for i in 1..n-1: if prices[i]>prices[i-1]: profit+=prices[i]-prices[i-1]. return profit.",
    ],
  },

  // ─── Day 31: DP Part 3 ───────────────────────────────────────────────────
  {
    title: "Nth Catalan Number",
    topic: "Dynamic Programming",
    difficulty: "medium",
    day: 31,
    pattern: "DP / Combinatorics",
    description:
      "Compute the Nth Catalan number. Catalan numbers count many combinatorial structures like BSTs with n nodes, balanced parentheses, etc.",
    intuition:
      "C(n) = sum(C(i) * C(n-i-1) for i in 0..n-1). C(0)=C(1)=1. Bottom-up DP.",
    approach:
      "dp[0]=dp[1]=1. For n from 2 to N: dp[n] = sum(dp[i]*dp[n-i-1] for i in 0..n-1). Return dp[N].",
    timeComplexity: "O(n²)",
    spaceComplexity: "O(n)",
    companies: ["Amazon"],
    hints: [
      "C(n) = Σ C(i)*C(n-1-i) for i from 0 to n-1. C(0)=1.",
      "Also C(n) = C(2n,n)/(n+1) using combinatorics.",
      "DP: dp[0]=1. for n: dp[n] = sum(dp[i]*dp[n-1-i] for i in 0..n-1).",
      "First few: 1,1,2,5,14,42,132...",
      "Applications: number of BSTs with n nodes = C(n); valid parentheses with n pairs = C(n).",
    ],
  },
  {
    title: "Unique BSTs (Catalan Number)",
    topic: "Dynamic Programming",
    difficulty: "medium",
    day: 31,
    pattern: "DP",
    description:
      "Given an integer n, return the number of structurally unique BSTs with values 1..n.",
    intuition:
      "This is the Nth Catalan number. For each possible root i (1..n): left subtrees = G(i-1), right subtrees = G(n-i). G(n) = sum(G(i-1)*G(n-i)) for i=1..n.",
    approach:
      "dp[0]=dp[1]=1. For n in 2..N: dp[n]=sum(dp[i-1]*dp[n-i] for i in 1..n). Return dp[N].",
    timeComplexity: "O(n²)",
    spaceComplexity: "O(n)",
    companies: ["Amazon", "Google"],
    hints: [
      "G(n) = number of unique BSTs with n nodes = Catalan number C(n).",
      "For root i: left has i-1 nodes (G(i-1) arrangements), right has n-i nodes (G(n-i) arrangements).",
      "G(n) = Σ G(i-1)*G(n-i) for i=1..n.",
      "dp[0]=1, dp[1]=1. for n=2..N: dp[n]=Σdp[i]*dp[n-1-i] for i=0..n-1.",
      "Same as Nth Catalan number.",
    ],
  },
  {
    title: "Rod Cutting",
    topic: "Dynamic Programming",
    difficulty: "hard",
    day: 31,
    pattern: "Unbounded Knapsack",
    description:
      "Given a rod of length n and price array where price[i] is the price of a rod of length i+1, find the maximum value obtainable by cutting the rod.",
    intuition:
      "Unbounded knapsack: for each length, try all cuts and take the one that maximises value. dp[length] = max value for a rod of that length.",
    approach:
      "dp[0]=0. For l from 1 to n: for cut from 1 to l: dp[l]=max(dp[l], price[cut-1]+dp[l-cut]). Return dp[n].",
    timeComplexity: "O(n²)",
    spaceComplexity: "O(n)",
    companies: ["Amazon"],
    hints: [
      "Unbounded knapsack: a piece of length i can be cut repeatedly.",
      "dp[l] = max value for rod of length l.",
      "dp[l] = max(price[i] + dp[l-i-1]) for i from 0 to l-1.",
      "dp[0]=0. for l=1..n: for i=0..l-1: dp[l]=max(dp[l], price[i]+dp[l-i-1]).",
      "No need to cut at all is also valid: dp[l] is initialised with no cuts implied.",
    ],
  },
  {
    title: "Palindromic Partitioning (Min Cuts)",
    topic: "Dynamic Programming",
    difficulty: "medium",
    day: 31,
    pattern: "2D DP",
    description:
      "Given a string s, partition it into palindromic substrings. Find the minimum number of cuts needed.",
    intuition:
      "dp[i] = min cuts for s[0..i]. dp[i] = min(dp[j-1]+1) for all j where s[j..i] is a palindrome. Precompute isPalin[i][j].",
    approach:
      "Precompute isPalin. dp[0]=0. For i from 1 to n-1: if isPalin[0][i]: dp[i]=0. Else: dp[i]=min(dp[j-1]+1) for j from 1 to i where isPalin[j][i].",
    timeComplexity: "O(n²)",
    spaceComplexity: "O(n²)",
    companies: ["Amazon", "Google"],
    hints: [
      "Precompute isPalin[i][j] using DP. dp for min cuts.",
      "dp[i] = min cuts for s[0..i]. If s[0..i] is palindrome, dp[i]=0.",
      "dp[i] = min(dp[j-1]+1) for all j in 1..i where isPalin[j][i].",
      "isPalin[i][j] = s[i]==s[j] and (j-i<=2 or isPalin[i+1][j-1]).",
      "O(n²) time and space.",
    ],
  },
  {
    title: "Matrix Chain Multiplication (MCM)",
    topic: "Dynamic Programming",
    difficulty: "hard",
    day: 31,
    pattern: "Interval DP",
    description:
      "Given dimensions of n matrices, find the minimum number of scalar multiplications needed to multiply them all.",
    intuition:
      "For each subchain of matrices, try every possible split point k. Cost = cost(left) + cost(right) + actual multiply cost. Minimise over all splits.",
    approach:
      "dp[i][j] = min cost to multiply matrices i..j. For length l from 2 to n: for all start i: j=i+l-1. For k from i to j-1: dp[i][j]=min(dp[i][k]+dp[k+1][j]+dim[i-1]*dim[k]*dim[j]).",
    timeComplexity: "O(n³)",
    spaceComplexity: "O(n²)",
    companies: ["Amazon"],
    hints: [
      "Split the chain at every possible position k. Cost = left subchain + right subchain + merge cost.",
      "dp[i][j] = min cost to multiply matrices i..j.",
      "merge cost at split k = p[i-1]*p[k]*p[j] (dimensions of the result multiply).",
      "Fill by increasing chain length. dp[i][i]=0 (single matrix, no multiply).",
      "for l=2..n: for i=1..n-l+1: j=i+l-1. dp[i][j]=INF. for k=i..j-1: cost=dp[i][k]+dp[k+1][j]+p[i-1]*p[k]*p[j]. dp[i][j]=min(dp[i][j],cost).",
    ],
  },

  // ─── Day 32: DP Part 4 ───────────────────────────────────────────────────
  {
    title: "Minimum Partition",
    topic: "Dynamic Programming",
    difficulty: "hard",
    day: 32,
    pattern: "Subset Sum DP",
    description:
      "Given an array, partition it into two subsets such that the difference of their sums is minimised. Return the minimum difference.",
    intuition:
      "Find all subset sums achievable (subset sum DP). The minimum difference is the minimum of |totalSum - 2*s| for all achievable sums s <= totalSum/2.",
    approach:
      "dp = set of achievable sums. Start {0}. For each num: dp = dp ∪ {s+num for s in dp}. minDiff = min(|totalSum - 2*s| for s in dp if s <= totalSum//2).",
    timeComplexity: "O(n * totalSum)",
    spaceComplexity: "O(totalSum)",
    companies: ["Amazon"],
    hints: [
      "Partition into two subsets S1 and S2. |S1-S2| = |total - 2*S1|. Minimise by finding S1 closest to total/2.",
      "Subset sum DP: find all achievable sums up to total/2.",
      "dp=[False]*(total+1). dp[0]=True. for num: for s from total down to num: dp[s]|=dp[s-num].",
      "minDiff = min(|total-2*s| for s in 0..total//2 if dp[s]).",
      "Similar to 0/1 knapsack but with a boolean achievability DP.",
    ],
  },
  {
    title: "Maximum Product Subarray",
    topic: "Dynamic Programming",
    difficulty: "medium",
    day: 32,
    pattern: "DP",
    description:
      "Given an integer array, find the contiguous subarray that has the largest product. Return the product.",
    intuition:
      "Track both maxProduct and minProduct (because a negative min * negative number = large positive). At each element, update max and min considering the current element alone or extending.",
    approach:
      "maxP=minP=result=nums[0]. For i from 1 to n-1: candidates=(nums[i], maxP*nums[i], minP*nums[i]). maxP=max(candidates). minP=min(candidates). result=max(result, maxP).",
    timeComplexity: "O(n)",
    spaceComplexity: "O(1)",
    companies: ["Amazon", "Google", "Microsoft"],
    hints: [
      "Track both max and min product ending at current index — a negative min can become the max.",
      "At each position: new max = max(nums[i], maxSoFar*nums[i], minSoFar*nums[i]). Same for min.",
      "Starting fresh at nums[i] handles the case where previous product hurts more than helps.",
      "maxP, minP = nums[0]. for i in 1..n-1: tmp = maxP. maxP=max(nums[i], maxP*nums[i], minP*nums[i]). minP=min(nums[i], tmp*nums[i], minP*nums[i]).",
      "result = max(result, maxP) at each step.",
    ],
  },
  {
    title: "Wildcard Pattern Matching",
    topic: "Dynamic Programming",
    difficulty: "hard",
    day: 32,
    pattern: "2D DP",
    description:
      "Given a string s and a pattern p (with '?' matching any single char and '*' matching any sequence including empty), return true if they match.",
    intuition:
      "dp[i][j] = s[0..i-1] matches p[0..j-1]. '?' matches any char. '*' matches empty (dp[i][j-1]) or any sequence (dp[i-1][j]).",
    approach:
      "dp[0][0]=true. dp[0][j]=dp[0][j-1] if p[j-1]=='*'. For i,j: if match(s[i-1],p[j-1]): dp[i][j]=dp[i-1][j-1]. If p[j-1]=='*': dp[i][j]=dp[i-1][j] or dp[i][j-1].",
    timeComplexity: "O(m*n)",
    spaceComplexity: "O(m*n)",
    companies: ["Amazon", "Google"],
    hints: [
      "'?' matches exactly one char. '*' matches zero or more chars (any sequence).",
      "dp[i][j] = does s[0..i-1] match p[0..j-1]?",
      "Base: dp[0][0]=True. dp[0][j]=dp[0][j-1] if p[j-1]='*' (star matching empty).",
      "If p[j-1]='*': dp[i][j] = dp[i-1][j] (star consumes s[i-1]) OR dp[i][j-1] (star matches empty here).",
      "If p[j-1]='?' or s[i-1]==p[j-1]: dp[i][j]=dp[i-1][j-1].",
    ],
  },
  {
    title: "Longest Bitonic Subsequence",
    topic: "Dynamic Programming",
    difficulty: "hard",
    day: 32,
    pattern: "LIS DP",
    description:
      "Given an array, find the length of the longest bitonic subsequence — one that first increases and then decreases.",
    intuition:
      "For each index i, compute LIS ending at i (from left) and LIS starting at i (going right, actually LDS). Length of bitonic through i = LIS[i] + LDS[i] - 1.",
    approach:
      "inc[i] = LIS length ending at i. dec[i] = LIS length starting at i (from right). maxLen = max(inc[i]+dec[i]-1) for all i where both > 1.",
    timeComplexity: "O(n²)",
    spaceComplexity: "O(n)",
    companies: ["Amazon"],
    hints: [
      "Compute LIS ending at each position (left to right).",
      "Compute LDS starting at each position (right to left, same as LIS).",
      "Bitonic through i = inc[i] + dec[i] - 1.",
      "Ensure both inc[i]>1 and dec[i]>1 for a true bitonic (both increasing and decreasing parts).",
      "inc[i]=1+max(inc[j] for j<i if arr[j]<arr[i]). dec[i]=1+max(dec[j] for j>i if arr[j]<arr[i]). max(inc[i]+dec[i]-1).",
    ],
  },
  {
    title: "Egg Drop Problem",
    topic: "Dynamic Programming",
    difficulty: "hard",
    day: 32,
    pattern: "DP / Binary Search",
    description:
      "You have k eggs and n floors. Find the minimum number of trials in the worst case to determine the critical floor (highest floor from which an egg doesn't break).",
    intuition:
      "dp[m][k] = max floors testable with m moves and k eggs. dp[m][k] = dp[m-1][k-1] + dp[m-1][k] + 1 (egg breaks: dp[m-1][k-1] floors below; egg doesn't break: dp[m-1][k] floors above). Find min m where dp[m][k]>=n.",
    approach:
      "Compute dp[m][k] = max floors coverable. Increment m until dp[m][k] >= n. Return m.",
    timeComplexity: "O(k log n)",
    spaceComplexity: "O(k)",
    companies: ["Amazon", "Google"],
    hints: [
      "Classic approach: dp[eggs][floor] = min trials. O(kn²) naive. Optimise with binary search.",
      "Alternative: dp[moves][eggs] = max floors testable. dp[m][k] = dp[m-1][k-1]+dp[m-1][k]+1.",
      "Find minimum m such that dp[m][k] >= n.",
      "dp[0][k]=0, dp[1][k]=1, dp[m][1]=m. dp[m][k]=dp[m-1][k-1]+dp[m-1][k]+1.",
      "m starts at 1, increment until dp[m][k]>=n. Return m. O(k*m)=O(k log n).",
    ],
  },

  // ─── Day 33: Greedy ──────────────────────────────────────────────────────
  {
    title: "Assign Cookies",
    topic: "Greedy",
    difficulty: "easy",
    day: 33,
    pattern: "Greedy / Sorting",
    description:
      "Each child i has a greed factor g[i]. Each cookie j has size s[j]. A child is content if s[j] >= g[i]. Assign cookies to maximise the number of content children.",
    intuition:
      "Sort both. Use smallest sufficient cookie for each child (least waste). Two-pointer approach.",
    approach:
      "Sort g and s. child=0, cookie=0. While child<g.length and cookie<s.length: if s[cookie]>=g[child]: child++. cookie++. Return child.",
    timeComplexity: "O(n log n + m log m)",
    spaceComplexity: "O(1)",
    companies: ["Amazon"],
    hints: [
      "Sort greed factors and cookie sizes. Match smallest sufficient cookie to smallest greed.",
      "Two pointers: if current cookie satisfies current child, move both. Else move cookie only.",
      "sort(g), sort(s). i=j=0. while i<len(g) and j<len(s): if s[j]>=g[i]: i++. j++. return i.",
      "Greedy: don't waste a big cookie on a small greed — use the smallest sufficient cookie.",
      "Each cookie is tried at most once → O(n+m) after sorting.",
    ],
  },
  {
    title: "Indian Coins (Minimum Coins Greedy)",
    topic: "Greedy",
    difficulty: "easy",
    day: 33,
    pattern: "Greedy",
    description:
      "Given Indian coin denominations (1, 2, 5, 10, 20, 50, 100, 500, 2000), find the minimum number of coins to make a given amount using the greedy approach.",
    intuition:
      "For canonical coin systems (like Indian/US coins), greedy always picks the largest coin that fits. This works because the coin system is canonical (no coin can be formed more efficiently by smaller coins).",
    approach:
      "coins=[2000,500,100,50,20,10,5,2,1]. For each coin: while amount>=coin: count++; amount-=coin. Return count.",
    timeComplexity: "O(amount)",
    spaceComplexity: "O(1)",
    companies: ["Amazon"],
    hints: [
      "Greedy: always use the largest possible coin denomination.",
      "This works for canonical coin systems (Indian rupees, US dollars).",
      "Sort coins descending. For each coin: use as many as possible. Move to next smaller.",
      "coins=[2000,500,100,50,20,10,5,2,1]. for coin in coins: count+=amount//coin; amount%=coin.",
      "return total count.",
    ],
  },
  {
    title: "Fractional Knapsack",
    topic: "Greedy",
    difficulty: "medium",
    day: 33,
    pattern: "Greedy",
    description:
      "Given n items with weights and values and a knapsack capacity W, maximise the total value. You can take fractions of items.",
    intuition:
      "Fractional items allowed → greedily pick items with highest value-per-unit-weight first. Take as much of each as possible.",
    approach:
      "Compute value/weight for each item. Sort descending. For each item: take min(item.weight, remaining_capacity). Adjust total value and capacity.",
    timeComplexity: "O(n log n)",
    spaceComplexity: "O(1)",
    companies: ["Amazon"],
    hints: [
      "Value density = value/weight. Greedily take items with highest density first.",
      "Sort by value/weight descending.",
      "For each item: if fits entirely, take it. Else take a fraction.",
      "totalValue=0. for item in sorted(value/weight desc): if item.weight<=cap: take all. else: take cap fraction.",
      "totalValue += item.value * (min(item.weight, cap) / item.weight). cap -= taken.",
    ],
  },
  {
    title: "Job Scheduling (Weighted Job Scheduling)",
    topic: "Greedy",
    difficulty: "medium",
    day: 33,
    pattern: "Greedy / DP",
    description:
      "Given a set of jobs with deadlines and profits, schedule jobs to maximise profit. Each job takes 1 unit of time and must be completed by its deadline.",
    intuition:
      "Sort jobs by profit descending. For each job, place it in the latest available slot before its deadline (greedy). Use a Union-Find or boolean array to track available slots.",
    approach:
      "Sort by profit desc. slots=[False]*(maxDeadline+1). For each job: for slot from min(deadline, maxDeadline) down to 1: if not slots[slot]: slots[slot]=True; profit+=job.profit; break.",
    timeComplexity: "O(n * maxDeadline)",
    spaceComplexity: "O(maxDeadline)",
    companies: ["Amazon"],
    hints: [
      "Sort by profit descending. Greedily assign each job to the latest available slot.",
      "Latest available slot before deadline — maximises chance for later jobs.",
      "slots array: True if occupied. For each job, scan from deadline to 1.",
      "Union-Find optimises slot finding to O(α).",
      "sort by profit desc. for job: for t from min(job.deadline, max_deadline) to 1: if !slot[t]: slot[t]=True; total+=profit; break.",
    ],
  },
  {
    title: "Activity Selection",
    topic: "Greedy",
    difficulty: "medium",
    day: 33,
    pattern: "Greedy",
    description:
      "Given n activities with start and finish times, select the maximum number of non-overlapping activities.",
    intuition:
      "Sort by finish time. Greedily select each activity if it starts after the last selected activity finishes. Earliest finishing activity is always in the optimal set.",
    approach:
      "Sort by finish time. Select first activity. lastFinish=activities[0].finish. For each remaining: if start >= lastFinish: select it, lastFinish=activity.finish. count++.",
    timeComplexity: "O(n log n)",
    spaceComplexity: "O(1)",
    companies: ["Amazon", "Google"],
    hints: [
      "Sort by finish time. Always select the activity that finishes earliest among compatible ones.",
      "The greedy choice: earliest finish leaves the most room for future activities.",
      "sort by end time. count=1, lastEnd=activities[0].end. for a in activities[1:]: if a.start>=lastEnd: count++; lastEnd=a.end.",
      "Proof: exchange argument — swapping greedy choice for any other can't do better.",
      "return count.",
    ],
  },
  {
    title: "Maximum Length of Pair Chain",
    topic: "Greedy",
    difficulty: "medium",
    day: 33,
    pattern: "Greedy / DP",
    description:
      "Given n pairs [a, b] where a < b, chain pairs such that pairs[i][1] < pairs[i+1][0]. Find the maximum length chain.",
    intuition:
      "Same as activity selection — sort by end time, greedily pick pairs that start after the previous one ends.",
    approach:
      "Sort by second element. Select first pair. lastEnd=pairs[0][1]. For each remaining: if pairs[i][0]>lastEnd: count++; lastEnd=pairs[i][1]. Return count.",
    timeComplexity: "O(n log n)",
    spaceComplexity: "O(1)",
    companies: ["Amazon"],
    hints: [
      "Identical to Activity Selection Problem.",
      "Sort pairs by end time. Greedy: pick the pair that ends earliest and starts after last end.",
      "sort by pairs[i][1]. count=1, end=pairs[0][1]. for p in pairs[1:]: if p[0]>end: count++; end=p[1].",
      "The condition is strict: pairs[i][1] < pairs[i+1][0] (strictly).",
      "return count.",
    ],
  },

  // ─── Day 34: Miscellaneous ────────────────────────────────────────────────
  {
    title: "Power Set",
    topic: "Miscellaneous",
    difficulty: "medium",
    day: 34,
    pattern: "Bit Manipulation / Backtracking",
    description:
      "Given an integer array nums, return all possible subsets (the power set). The solution set must not contain duplicate subsets.",
    intuition:
      "For n elements, there are 2^n subsets. Each subset corresponds to a bitmask from 0 to 2^n-1 where bit i indicates whether element i is included.",
    approach:
      "For mask from 0 to 2^n-1: build subset from all set bits in mask. Add to result.",
    timeComplexity: "O(n * 2^n)",
    spaceComplexity: "O(n * 2^n)",
    companies: ["Amazon", "Google"],
    hints: [
      "2^n subsets for n elements. Each subset = a bitmask.",
      "Iterate mask from 0 to (1<<n)-1. For each mask: include nums[i] if bit i is set.",
      "for mask in range(1<<n): subset=[nums[i] for i in range(n) if mask&(1<<i)]. result.append(subset).",
      "Backtracking alternative: dfs(start, path): add path; for i from start: add nums[i], dfs(i+1), remove.",
      "With duplicates (Subsets II): sort and skip duplicates — same as Day 10.",
    ],
  },
  {
    title: "Maximum XOR of Two Numbers in an Array",
    topic: "Miscellaneous",
    difficulty: "medium",
    day: 34,
    pattern: "Trie / Bit Manipulation",
    description:
      "Given an integer array nums, return the maximum XOR of any two elements.",
    intuition:
      "Build a binary trie from all numbers. For each number, greedily traverse the trie going in the opposite bit direction to maximise XOR.",
    approach:
      "Build trie of all numbers (bit by bit from MSB). For each num, traverse trie taking the opposite bit when available. Compute max XOR.",
    timeComplexity: "O(n)",
    spaceComplexity: "O(n)",
    companies: ["Amazon", "Google"],
    hints: [
      "For each number, find the number in the array that maximises XOR with it.",
      "Build a binary trie (bit 31 to 0). For each number, greedily go opposite bit in trie.",
      "Opposite bit: XOR with 1 flips the bit. Going opposite maximises XOR.",
      "insert all nums into trie (MSB first). for each num: traverse trie: if opposite bit child exists: go there, add that bit to xor. else: go same bit.",
      "Track max XOR seen.",
    ],
  },
  {
    title: "Power of Two",
    topic: "Miscellaneous",
    difficulty: "easy",
    day: 34,
    pattern: "Bit Manipulation",
    description:
      "Given an integer n, return true if it is a power of two.",
    intuition:
      "A power of 2 in binary has exactly one '1' bit. n & (n-1) clears the lowest set bit — if result is 0 and n > 0, then n has only one set bit.",
    approach:
      "return n > 0 and (n & (n-1)) == 0.",
    timeComplexity: "O(1)",
    spaceComplexity: "O(1)",
    companies: ["Amazon"],
    hints: [
      "Powers of 2 in binary: 1, 10, 100, 1000... exactly one '1' bit.",
      "n & (n-1) clears the lowest set bit. If n is power of 2, this equals 0.",
      "Must also check n > 0 (0 is not a power of 2).",
      "return n > 0 and (n & (n-1)) == 0.",
      "Alternative: count set bits (popcount) == 1.",
    ],
  },
  {
    title: "XOR Beauty of Array",
    topic: "Miscellaneous",
    difficulty: "medium",
    day: 34,
    pattern: "Bit Manipulation / Math",
    description:
      "Given an array nums, find the XOR beauty of the array defined as XOR of all values f(i,j,k) = (nums[i] | nums[j]) & nums[k] for 0 <= i <= j <= k < n.",
    intuition:
      "The XOR of all f(i,j,k) simplifies to XOR of all elements. This is because for a fixed k, the terms (nums[i]|nums[j])&nums[k] XOR to nums[k] when all combinations are considered.",
    approach:
      "Return XOR of all elements in nums.",
    timeComplexity: "O(n)",
    spaceComplexity: "O(1)",
    companies: ["Amazon"],
    hints: [
      "Analyse bit by bit. For a fixed bit position, count how many f(i,j,k) have that bit set.",
      "The result simplifies — the XOR of all f(i,j,k) = XOR of all nums[i].",
      "Mathematical reduction: for each k, the sum of (nums[i]|nums[j])&nums[k] over all i,j reduces via XOR cancellation.",
      "return reduce(xor, nums) — XOR all elements together.",
      "XOR of entire array is the answer.",
    ],
  },
  {
    title: "Watering Plants II",
    topic: "Miscellaneous",
    difficulty: "medium",
    day: 34,
    pattern: "Two Pointers / Simulation",
    description:
      "Two gardeners water plants from opposite ends with capacities cap1 and cap2. They refill when water runs out. Find the number of times they refill.",
    intuition:
      "Two pointers from both ends. Each pointer has its own current water level. When water is insufficient, refill. Stop when pointers meet (one pointer gets the middle plant).",
    approach:
      "left=0, right=n-1, w1=cap1, w2=cap2, refills=0. While left<right: water left plant (refill if needed), water right plant (refill if needed), advance. If left==right: whoever has less water refills.",
    timeComplexity: "O(n)",
    spaceComplexity: "O(1)",
    companies: ["Amazon"],
    hints: [
      "Two pointers from both ends. Each maintains current water level.",
      "If current water < plant[left] (or plant[right]): refill, increment refills.",
      "When pointers meet at the middle plant: the one with insufficient water refills (or both if both insufficient).",
      "left=0, right=n-1, cur1=cap1, cur2=cap2, ans=0. while left<right: handle left, handle right, left++, right--.",
      "When left==right: if cur1 < plants[left] and cur2 < plants[left]: only one of them goes there (the one with more water refills or doesn't).",
    ],
  },
];

export default PROBLEMS;
